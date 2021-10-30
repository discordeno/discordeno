import { RestManager } from "../bot.ts";

/** Processes the queue by looping over each path separately until the queues are empty. */
export function processQueue(rest: RestManager, id: string, redo?: "redo") {
  const queue = rest.pathQueues.get(id);
  if (!queue) return;

  while (queue.requests.length) {
    rest.debug(`[REST - processQueue] Running while loop.`);
    // SELECT THE FIRST ITEM FROM THIS QUEUE
    const queuedRequest = queue.requests[0];
    // IF THIS DOESNT HAVE ANY ITEMS JUST CANCEL, THE CLEANER WILL REMOVE IT.
    if (!queuedRequest) break;

    // console.log("process queue", 3);
    // if (redo) console.log("process queue redo", 3);

    const basicURL = rest.simplifyUrl(queuedRequest.request.url, queuedRequest.request.method.toUpperCase());

    // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
    const urlResetIn = rest.checkRateLimits(rest, basicURL);
    if (urlResetIn) {
      // if (redo) console.log("process queue redo", 4);
      // console.log("process queue", 4);

      // ONLY ADD TIMEOUT IF ANOTHER QUEUE IS NOT PENDING
      if (!queue.isWaiting) {
        queue.isWaiting = true;

        setTimeout(() => {
          // if (redo) console.log("process queue redo", 5);
          // console.log("process queue", 5);
          queue.isWaiting = false;

          rest.debug(`[REST - processQueue] rate limited, running setTimeout.`);
          rest.processQueue(rest, id, "redo");
        }, urlResetIn);
      }

      // BREAK WHILE LOOP
      break;
    }

    // console.log("process queue", 6);
    // if (redo) console.log("process queue redo", 6);

    // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
    const bucketResetIn = queuedRequest.payload.bucketId
      ? rest.checkRateLimits(rest, queuedRequest.payload.bucketId)
      : false;
    if (bucketResetIn) console.log("process queue bucketed", bucketResetIn);
    // THIS BUCKET IS STILL RATELIMITED, RE-ADD TO QUEUE
    if (bucketResetIn) continue;
    // EXECUTE THE REQUEST

    // IF THIS IS A GET REQUEST, CHANGE THE BODY TO QUERY PARAMETERS
    const query =
      queuedRequest.request.method.toUpperCase() === "GET" && queuedRequest.payload.body
        ? Object.keys(queuedRequest.payload.body)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  (queuedRequest.payload.body as Record<string, string>)[key]
                )}`
            )
            .join("&")
        : "";
    const urlToUse =
      queuedRequest.request.method.toUpperCase() === "GET" && query
        ? `${queuedRequest.request.url}?${query}`
        : queuedRequest.request.url;
    // CUSTOM HANDLER FOR USER TO LOG OR WHATEVER WHENEVER A FETCH IS MADE
    rest.debug(`[REST - Add To Global Queue] ${JSON.stringify(queuedRequest.payload)}`);
    rest.globalQueue.push({
      ...queuedRequest,
      basicURL,
      urlToUse,
    });
    rest.processGlobalQueue(rest);
    queue.requests.shift();
  }

  // ONCE QUEUE IS DONE, WE CAN TRY CLEANING UP
  rest.cleanupQueues(rest);
}
