import { RestManager } from "./restManager.ts";

/** Processes the queue by looping over each path separately until the queues are empty. */
export function processQueue(rest: RestManager, id: string) {
  const queue = rest.pathQueues.get(id);
  if (!queue) return;

  while (queue.requests.length) {
    rest.debug(`[REST - processQueue] Running while loop.`);
    // SELECT THE FIRST ITEM FROM THIS QUEUE
    const queuedRequest = queue.requests[0];
    // IF THIS DOESN'T HAVE ANY ITEMS JUST CANCEL, THE CLEANER WILL REMOVE IT.
    if (!queuedRequest) break;

    const basicURL = rest.simplifyUrl(queuedRequest.request.url, queuedRequest.request.method);

    // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
    const urlResetIn = rest.checkRateLimits(rest, basicURL);
    if (urlResetIn) {
      // ONLY ADD TIMEOUT IF ANOTHER QUEUE IS NOT PENDING
      if (!queue.isWaiting) {
        queue.isWaiting = true;

        setTimeout(() => {
          queue.isWaiting = false;

          rest.debug(`[REST - processQueue] rate limited, running setTimeout.`);
          rest.processQueue(rest, id);
        }, urlResetIn);
      }

      // BREAK WHILE LOOP
      break;
    }

    // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
    const bucketResetIn = queuedRequest.payload.bucketId
      ? rest.checkRateLimits(rest, queuedRequest.payload.bucketId)
      : false;
    // THIS BUCKET IS STILL RATE LIMITED, RE-ADD TO QUEUE
    if (bucketResetIn) continue;
    // EXECUTE THE REQUEST

    // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
    rest.debug(`[REST - Add To Global Queue] ${JSON.stringify(queuedRequest.payload)}`);
    rest.globalQueue.push({
      ...queuedRequest,
      urlToUse: queuedRequest.request.url,
      basicURL,
    });
    rest.processGlobalQueue(rest);
    queue.requests.shift();
  }

  // ONCE QUEUE IS DONE, WE CAN TRY CLEANING UP
  rest.cleanupQueues(rest);
}
