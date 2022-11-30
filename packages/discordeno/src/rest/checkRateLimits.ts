import { RestManager } from "./restManager.ts";

/** Check the rate limits for a url or a bucket. */
export function checkRateLimits(rest: RestManager, url: string) {
  const ratelimited = rest.rateLimitedPaths.get(url);
  const global = rest.rateLimitedPaths.get("global");
  const now = Date.now();

  if (ratelimited && now < ratelimited.resetTimestamp) {
    return ratelimited.resetTimestamp - now;
  }
  if (global && now < global.resetTimestamp) {
    return global.resetTimestamp - now;
  }

  return false;
}
