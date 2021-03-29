import { rest } from "./rest.ts";

/** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
export function processRateLimitedPaths(bypassCheck = true) {
  if (!bypassCheck && rest.processingRateLimitedPaths) return;

  rest.processingRateLimitedPaths = true;

  const now = Date.now();

  rest.ratelimitedPaths.forEach((value, key) => {
    // IF THE TIME HAS NOT REACHED CANCEL
    if (value.resetTimestamp > now) return;
    // RATE LIMIT IS OVER, DELETE THE RATE LIMITER
    rest.ratelimitedPaths.delete(key);
    // IF IT WAS GLOBAL ALSO MARK THE GLOBAL VALUE AS FALSE
    if (key === "global") rest.globallyRateLimited = false;
  });

  // ALL PATHS ARE CLEARED CAN CANCEL OUT!
  if (!rest.ratelimitedPaths.size) return;
  // RECHECK IN 1 SECOND
  else setTimeout(() => processRateLimitedPaths(), 1000);
}
