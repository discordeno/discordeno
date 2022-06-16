import { RestManager } from "./restManager.ts";
import { HTTPResponseCodes } from "../types/shared.ts";

export async function processGlobalQueue(rest: RestManager) {
  // IF QUEUE IS EMPTY EXIT
  if (!rest.globalQueue.length) return;
  // IF QUEUE IS ALREADY RUNNING EXIT
  if (rest.globalQueueProcessing) return;

  // SET AS TRUE SO OTHER QUEUES DON'T START
  rest.globalQueueProcessing = true;

  while (rest.globalQueue.length) {
    // IF THE BOT IS GLOBALLY RATE LIMITED TRY AGAIN
    if (rest.globallyRateLimited) {
      setTimeout(() => {
        rest.debug(`[REST - processGlobalQueue] Globally rate limited, running setTimeout.`);
        rest.processGlobalQueue(rest);
      }, 1000);

      // BREAK WHILE LOOP
      break;
    }

    if (rest.invalidRequests === rest.maxInvalidRequests - rest.invalidRequestsSafetyAmount) {
      setTimeout(() => {
        const time = rest.invalidRequestsInterval - (Date.now() - rest.invalidRequestFrozenAt);
        rest.debug(
          `[REST - processGlobalQueue] Freeze global queue because of invalid requests. Time Remaining: ${
            time / 1000
          } seconds.`,
        );
        rest.processGlobalQueue(rest);
      }, 1000);

      // BREAK WHILE LOOP
      break;
    }

    const request = rest.globalQueue.shift();
    // REMOVES ANY POTENTIAL INVALID CONFLICTS
    if (!request) continue;

    // CHECK RATE LIMITS FOR 429 REPEATS
    // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
    const urlResetIn = rest.checkRateLimits(rest, request.basicURL);
    // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
    const bucketResetIn = request.payload.bucketId ? rest.checkRateLimits(rest, request.payload.bucketId) : false;

    if (urlResetIn || bucketResetIn) {
      // ONLY ADD TIMEOUT IF ANOTHER QUEUE IS NOT PENDING
      setTimeout(() => {
        rest.debug(`[REST - processGlobalQueue] rate limited, running setTimeout.`);
        // THIS REST IS RATE LIMITED, SO PUSH BACK TO START
        rest.globalQueue.unshift(request);
        // START QUEUE IF NOT STARTED
        rest.processGlobalQueue(rest);
      }, urlResetIn || (bucketResetIn as number));

      continue;
    }

    await rest.sendRequest(rest, {
      url: request.urlToUse,
      method: request.request.method,
      bucketId: request.payload.bucketId,
      reject: request.request.reject,
      respond: request.request.respond,
      retryCount: request.payload.retryCount ?? 0,
      payload: rest.createRequestBody(rest, {
        method: request.request.method,
        body: request.payload.body,
      }),
    })
      // Should be handled in sendRequest, this catch just prevents bots from dying
      .catch(() => null);
  }

  // ALLOW OTHER QUEUES TO START WHEN NEW REQUEST IS MADE
  rest.globalQueueProcessing = false;
}
