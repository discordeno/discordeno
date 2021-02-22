import { restCache } from "./cache.ts";
import { createRequestBody, processRequestHeaders } from "./request.ts";
import { HttpResponseCode } from "./types/mod.ts";
import { delay } from "../util/utils.ts";

/** If the queue is not already processing, this will start processing the queue. */
export function startQueue() {
  // IF ALREADY PROCESSING CANCEL
  if (restCache.processingQueue) return;
  // MARK AS PROCESSING
  restCache.processingQueue = true;
  processQueue();
}

/** Processes the queue by looping over each path separately until the queues are empty. */
export async function processQueue() {
  while (restCache.processingQueue) {
    // FOR EVERY PATH WE WILL START ITS OWN LOOP.
    restCache.pathQueues.forEach(async (queue) => {
      // MAKE SURE THIS QUEUE HAS NOT ALREADY STARTED
      if (queue.processing) return;
      // EACH PATH IS UNIQUE LIMITER
      while (queue.requests.length) {
        // IF THE BOT IS GLOBALLY RATELIMITED TRY AGAIN
        if (restCache.globallyRateLimited) continue;
        // SELECT THE FIRST ITEM FROM THIS QUEUE
        const [queuedRequest] = queue.requests;
        // IF THIS DOESNT HAVE ANY ITEMS JUST CANCEL, THE CLEANER WILL REMOVE IT.
        if (!queuedRequest) return;

        // MARK THIS QUEUE AS NOW BEING PROCESSED
        queue.processing = true;

        // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
        const urlResetIn = checkRateLimits(queuedRequest.payload.url);
        if (urlResetIn) continue;

        // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
        const bucketResetIn = queuedRequest.payload.bucketID
          ? checkRateLimits(queuedRequest.payload.bucketID)
          : false;
        // THIS BUCKET IS STILL RATELIMITED, RE-ADD TO QUEUE
        if (bucketResetIn) continue;

        // EXECUTE THE REQUEST

        // IF THIS IS A GET REQUEST, CHANGE THE BODY TO QUERY PARAMETERS
        const query =
          queuedRequest.payload.method === "get" && queuedRequest.payload.body
            ? Object.entries(queuedRequest.payload.body).map(([key, value]) =>
              `${encodeURIComponent(key)}=${
                encodeURIComponent(value as string)
              }`
            )
              .join("&")
            : "";
        const urlToUse = queuedRequest.payload.method === "get" && query
          ? `${queuedRequest.payload.url}?${query}`
          : queuedRequest.payload.url;

        // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
        restCache.eventHandlers.fetching(queuedRequest.payload);

        try {
          const response = await fetch(
            urlToUse,
            createRequestBody(queuedRequest),
          );
          restCache.eventHandlers.fetched(queuedRequest.payload);
          const bucketIDFromHeaders = processRequestHeaders(
            queuedRequest.payload.url,
            response.headers,
          );

          if (response.status < 200 && response.status >= 400) {
            restCache.eventHandlers.error(
              "httpError",
              queuedRequest.payload,
              response,
            );

            const error = response.status === HttpResponseCode.BadRequest
              ? "The request was improperly formatted, or the server couldn't understand it."
              : response.status === HttpResponseCode.Unauthorized
              ? "The Authorization header was missing or invalid."
              : response.status === HttpResponseCode.Forbidden
              ? "The Authorization token you passed did not have permission to the resource."
              : response.status === HttpResponseCode.NotFound
              ? "The resource at the location specified doesn't exist."
              : response.status === HttpResponseCode.MethodNotAllowed
              ? "The HTTP method used is not valid for the location specified."
              : response.status === HttpResponseCode.GatewayUnavailable
              ? "There was not a gateway available to process your request. Wait a bit and retry."
              : "REQUEST_UNKNOWN_ERROR";

            queuedRequest.request.respond(
              { status: response.status, body: JSON.stringify({ error }) },
            );
            queue.requests.shift();
            continue;
          }

          // SOMETIMES DISCORD RETURNS AN EMPTY 204 RESPONSE THAT CAN'T BE MADE TO JSON
          if (response.status === 204) {
            restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
            return queuedRequest.request.respond({ status: 204 });
          }

          // CONVERT THE RESPONSE TO JSON
          const json = await response.json();
          // IF THE RESPONSE WAS RATE LIMITED, HANDLE ACCORDINGLY
          if (
            json.retry_after ||
            json.message === "You are being rate limited."
          ) {
            // IF IT HAS MAXED RETRIES SOMETHING SERIOUSLY WRONG. CANCEL OUT.
            if (
              queuedRequest.payload.retryCount >=
                queuedRequest.options.maxRetryCount
            ) {
              restCache.eventHandlers.retriesMaxed(queuedRequest.payload);
              queuedRequest.request.respond(
                {
                  status: 200,
                  body: JSON.stringify(
                    {
                      error:
                        "The request was rate limited and it maxed out the retries limit.",
                    },
                  ),
                },
              );
              // REMOVE ITEM FROM QUEUE TO PREVENT RETRY
              queue.requests.shift();
              continue;
            }

            // SET THE BUCKET ID IF IT WAS PRESENT
            if (bucketIDFromHeaders) {
              queuedRequest.payload.bucketID = bucketIDFromHeaders;
            }
            // SINCE IT WAS RATELIMITE, RETRY AGAIN
            continue;
          }

          restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
          // REMOVE FROM QUEUE
          queue.requests.shift();
          queuedRequest.request.respond(
            { status: 200, body: JSON.stringify(json) },
          );
        } catch (error) {
          // SOMETHING WENT WRONG, LOG AND RESPOND WITH ERROR
          restCache.eventHandlers.fetchFailed(queuedRequest.payload, error);
          queuedRequest.request.respond(
            { status: 404, body: JSON.stringify({ error }) },
          );
          // REMOVE FROM QUEUE
          queue.requests.shift();
        }
      }

      // MARK THE QUEUE AS NO LONGER PROCESSING
      queue.processing = false;
      // ONCE QUEUE IS DONE, WE CAN TRY CLEANING UP
      cleanupQueues();
    });

    await delay(1000);
  }
}

/** Cleans up the queues by checking if there is nothing left and removing it. */
export function cleanupQueues() {
  for (const [key, queue] of restCache.pathQueues) {
    if (queue.requests.length) continue;
    // REMOVE IT FROM CACHE
    restCache.pathQueues.delete(key);
  }

  // NO QUEUE LEFT, DISABLE THE QUEUE
  if (!restCache.pathQueues.size) restCache.processingQueue = false;
}

/** Check the rate limits for a url or a bucket. */
export function checkRateLimits(url: string) {
  const ratelimited = restCache.ratelimitedPaths.get(url);
  const global = restCache.ratelimitedPaths.get("global");
  const now = Date.now();

  if (ratelimited && now < ratelimited.resetTimestamp) {
    return ratelimited.resetTimestamp - now;
  }
  if (global && now < global.resetTimestamp) {
    return global.resetTimestamp - now;
  }

  return false;
}
