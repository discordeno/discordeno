import { RestManager } from "../bot.ts";

/** Cleans up the queues by checking if there is nothing left and removing it. */
export function cleanupQueues(rest: RestManager) {
  for (const [key, queue] of rest.pathQueues) {
    rest.debug(`[REST - cleanupQueues] Running for of loop. ${key}`);
    if (queue.length) continue;
    // REMOVE IT FROM CACHE
    rest.pathQueues.delete(key);
  }

  // NO QUEUE LEFT, DISABLE THE QUEUE
  if (!rest.pathQueues.size) rest.processingQueue = false;
}
