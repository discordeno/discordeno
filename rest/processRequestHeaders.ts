import { RestManager } from "./restManager.ts";

/** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
export function processRequestHeaders(rest: RestManager, url: string, headers: Headers) {
  let rateLimited = false;

  // GET ALL NECESSARY HEADERS
  const remaining = headers.get("x-ratelimit-remaining");
  const retryAfter = headers.get("x-ratelimit-reset-after");
  const reset = Date.now() + Number(retryAfter) * 1000;
  const global = headers.get("x-ratelimit-global");
  // undefined override null needed for typings
  const bucketId = headers.get("x-ratelimit-bucket") || undefined;

  // IF THERE IS NO REMAINING RATE LIMIT, MARK IT AS RATE LIMITED
  if (remaining === "0") {
    rateLimited = true;

    // SAVE THE URL AS LIMITED, IMPORTANT FOR NEW REQUESTS BY USER WITHOUT BUCKET
    rest.rateLimitedPaths.set(url, {
      url,
      resetTimestamp: reset,
      bucketId,
    });

    // SAVE THE BUCKET AS LIMITED SINCE DIFFERENT URLS MAY SHARE A BUCKET
    if (bucketId) {
      rest.rateLimitedPaths.set(bucketId, {
        url,
        resetTimestamp: reset,
        bucketId,
      });
    }
  }

  // IF THERE IS NO REMAINING GLOBAL LIMIT, MARK IT RATE LIMITED GLOBALLY
  if (global) {
    const retryAfter = headers.get("retry-after");
    const globalReset = Date.now() + Number(retryAfter) * 1000;
    rest.debug(`[REST = Globally Rate Limited] URL: ${url} | Global Rest: ${globalReset}`);
    rest.globallyRateLimited = true;
    rateLimited = true;

    rest.rateLimitedPaths.set("global", {
      url: "global",
      resetTimestamp: globalReset,
      bucketId,
    });

    if (bucketId) {
      rest.rateLimitedPaths.set(bucketId, {
        url: "global",
        resetTimestamp: globalReset,
        bucketId,
      });
    }
  }

  if (rateLimited && !rest.processingRateLimitedPaths) {
    rest.processRateLimitedPaths(rest);
  }
  return rateLimited ? bucketId : undefined;
}
