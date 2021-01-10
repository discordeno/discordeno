import { restCache } from "./cache.ts";
import { createRequestBody, processRequestHeaders } from "./request.ts";
import { HttpResponseCode } from "./types/mod.ts";

/** If the queue is not already processing, this will start processing the queue. */
export function startQueue() {
  // if already processing cancel
  if (restCache.processingQueue) return;
  // mark as processing
  restCache.processingQueue = true;
  processQueue();
}

/** Processes the queue by looping over each path separately until the queues are empty. */
export function processQueue() {
  while (restCache.processingQueue) {
    // for every path we will start its own loop.
    restCache.pathQueues.forEach(async (queue) => {
      // each path is unique limiter
      while (queue.length) {
        // if the bot is globally ratelimited try again
        if (!restCache.globallyRateLimited) continue;
        // select the first item from this queue
        const [queuedRequest] = queue;
        // if this doesnt have any items just cancel, the cleaner will remove it.
        if (!queuedRequest) return;

        // if this url is still rate limited, try again
        const urlResetIn = checkRateLimits(queuedRequest.payload.url);
        if (urlResetIn) continue;

        // if a bucket exists, check the bucket's rate limits
        const bucketResetIn = queuedRequest.payload.bucketID
          ? checkRateLimits(queuedRequest.payload.bucketID)
          : false;
        // this bucket is still ratelimited, re-add to queue
        if (bucketResetIn) continue;

        // execute the request

        // if this is a get request, change the body to query parameters
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

        // custom handler for user to log or whatever whenever a fetch is made
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
            queue.shift();
            continue;
          }

          // sometimes discord returns an empty 204 response that can't be made to json
          if (response.status === 204) {
            restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
            return queuedRequest.request.respond({ status: 204 });
          }

          // convert the response to json
          const json = await response.json();

          // if the response was rate limited, handle accordingly
          if (
            json.retry_after ||
            json.message === "You are being rate limited."
          ) {
            // if it has maxed retries something seriously wrong. cancel out.
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
              // remove item from queue to prevent retry
              queue.shift();
              continue;
            }

            // set the bucket id if it was present
            if (bucketIDFromHeaders) {
              queuedRequest.payload.bucketID = bucketIDFromHeaders;
            }
            // since it was ratelimite, retry again
            continue;
          }

          restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
          // remove from queue
          queue.shift();
          queuedRequest.request.respond(
            { status: 200, body: JSON.stringify(json) },
          );
        } catch (error) {
          // something went wrong, log and respond with error
          restCache.eventHandlers.fetchFailed(queuedRequest.payload, error);
          queuedRequest.request.respond(
            { status: 404, body: JSON.stringify({ error }) },
          );
          // remove from queue
          queue.shift();
        }
      }

      // once queue is done, we can try cleaning up
      cleanupQueues();
    });
  }
}

/** Cleans up the queues by checking if there is nothing left and removing it. */
export function cleanupQueues() {
  restCache.pathQueues.forEach((queue, key) => {
    if (queue.length) return;
    // remove it from cache
    restCache.pathQueues.delete(key);
  });
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
