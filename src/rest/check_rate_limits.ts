import { rest } from "./rest.ts";

/** Check the rate limits for an url or a bucket. */
export function checkRateLimits(url: string) {
  const ratelimited = rest.ratelimitedPaths.get(url);
  const global = rest.ratelimitedPaths.get("global");
  const now = Date.now();

  if (ratelimited && now < ratelimited.resetTimestamp) {
    return ratelimited.resetTimestamp - now;
  }
  if (global && now < global.resetTimestamp) {
    return global.resetTimestamp - now;
  }

  return false;
}
