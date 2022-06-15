import { RestManager } from "./restManager.ts";

/** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
export function processRateLimitedPaths(rest: RestManager) {
  const now = Date.now();

  for (const [key, value] of rest.rateLimitedPaths.entries()) {
    rest.debug(`[REST - processRateLimitedPaths] Running for of loop. ${value.resetTimestamp - now}`);
    // IF THE TIME HAS NOT REACHED CANCEL
    if (value.resetTimestamp > now) continue;

    // RATE LIMIT IS OVER, DELETE THE RATE LIMITER
    rest.rateLimitedPaths.delete(key);
    // IF IT WAS GLOBAL ALSO MARK THE GLOBAL VALUE AS FALSE
    if (key === "global") rest.globallyRateLimited = false;
  }

  // ALL PATHS ARE CLEARED CAN CANCEL OUT!
  if (!rest.rateLimitedPaths.size) {
    rest.processingRateLimitedPaths = false;
  } else {
    rest.processingRateLimitedPaths = true;
    // RECHECK IN 1 SECOND
    setTimeout(() => {
      rest.debug(`[REST - processRateLimitedPaths] Running setTimeout.`);
      rest.processRateLimitedPaths(rest);
    }, 1000);
  }
}
