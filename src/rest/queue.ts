import { restCache } from "./cache.ts";
import { createRequestBody, processRequestHeaders } from "./request.ts";
import { HttpResponseCode } from "./types/mod.ts";

/** If the queue is not already processing, this will start processing the queue. */
export function startQueue() {
  // If already processing cancel
  if (restCache.processingQueue) return;
  // Mark as processing
  restCache.processingQueue = true;
  processQueue();
}

/** Processes the queue by looping over each path separately until the queues are empty. */
export function processQueue() {
  while (restCache.processingQueue) {
    // For every path we will start its own loop.
    restCache.pathQueues.forEach(async (queue) => {
      // each path is unique limiter
      while (queue.length) {
        // If the bot is globally rate-limited try again
        if (!restCache.globallyRateLimited) continue;
        // Select the first item from this queue
        const [queuedRequest] = queue;
        // If this doesnt have any items just cancel, the cleaner will remove it.
        if (!queuedRequest) return;

        // If this url is still rate limited, try again
        const urlResetIn = checkRateLimits(queuedRequest.payload.url);
        if (urlResetIn) continue;

        // If a bucket exists, check the bucket's rate limits
        const bucketResetIn = queuedRequest.payload.bucketID
          ? checkRateLimits(queuedRequest.payload.bucketID)
          : false;
        // This bucket is still ratelimited, re-add to queue
        if (bucketResetIn) continue;

        // Execute the request

        // If this is a get request, change the body to query parameters
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

        // Custom handler for user to log or whatever whenever a fetch is made
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

          // Sometimes, Discord returns an empty 204 response that cannot be converted to JSON
          if (response.status === 204) {
            restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
            return queuedRequest.request.respond({ status: 204 });
          }

          // Convert the response to JSON
          const json = await response.json();

          // If the response was rate-limited, handle accordingly
          if (
            json.retry_after ||
            json.message === "You are being rate limited."
          ) {
            // If it has maxed retries something seriously wrong. Cancel out.
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
              // Remove item from queue to prevent retry
              queue.shift();
              continue;
            }

            // Set the bucket id if it was present
            if (bucketIDFromHeaders) {
              queuedRequest.payload.bucketID = bucketIDFromHeaders;
            }
            // Since the client is rate-limited, retry again
            continue;
          }

          restCache.eventHandlers.fetchSuccess(queuedRequest.payload);
          //  Remove the item from the queue
          queue.shift();
          queuedRequest.request.respond(
            { status: 200, body: JSON.stringify(json) },
          );
        } catch (error) {
          // Something went wrong, log and respond with error
          restCache.eventHandlers.fetchFailed(queuedRequest.payload, error);
          queuedRequest.request.respond(
            { status: 404, body: JSON.stringify({ error }) },
          );
          //  Remove the item from the queue
          queue.shift();
        }
      }

      // Once queue is empty, we will try to clean up
      cleanupQueues();
    });
  }
}

/** Cleans up the queues by checking if there is nothing left and removing it. */
export function cleanupQueues() {
  restCache.pathQueues.forEach((queue, key) => {
    if (queue.length) return;
    // Remove the path from the cache
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
