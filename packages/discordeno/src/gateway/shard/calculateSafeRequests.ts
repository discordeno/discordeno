import { Shard } from "./types.js";

export function calculateSafeRequests(shard: Shard) {
  // * 2 adds extra safety layer for discords OP 1 requests that we need to respond to
  const safeRequests = shard.maxRequestsPerRateLimitTick -
    Math.ceil(shard.rateLimitResetInterval / shard.heart.interval) * 2;

  return safeRequests < 0 ? 0 : safeRequests;
}
