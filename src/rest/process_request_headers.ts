import { rest } from "./rest.ts";

/** Processes the rate limit headers and determines if it needs to be ratelimited and returns the bucket id if available */
export function processRequestHeaders(url: string, headers: Headers) {
  let ratelimited = false;

  // GET ALL NECESSARY HEADERS
  const remaining = headers.get("x-ratelimit-remaining");
  const resetTimestamp = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  const global = headers.get("x-ratelimit-global");
  const bucketId = headers.get("x-ratelimit-bucket");

  // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
  if (remaining && remaining === "0") {
    ratelimited = true;

    // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
    rest.ratelimitedPaths.set(url, {
      url,
      resetTimestamp: Number(resetTimestamp) * 1000,
      bucketId,
    });

    // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
    if (bucketId) {
      rest.ratelimitedPaths.set(bucketId, {
        url,
        resetTimestamp: Number(resetTimestamp) * 1000,
        bucketId,
      });
    }
  }

  // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
  if (global) {
    const reset = Date.now() + (Number(retryAfter) * 1000);
    rest.eventHandlers.globallyRateLimited(url, reset);
    rest.globallyRateLimited = true;
    ratelimited = true;

    rest.ratelimitedPaths.set("global", {
      url: "global",
      resetTimestamp: reset,
      bucketId,
    });

    if (bucketId) {
      rest.ratelimitedPaths.set(bucketId, {
        url: "global",
        resetTimestamp: reset,
        bucketId,
      });
    }
  }

  if (ratelimited && !rest.processingRateLimitedPaths) {
    rest.processRateLimitedPaths();
  }
  return ratelimited ? bucketId : undefined;
}
