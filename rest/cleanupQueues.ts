import { QueueBucket } from "./createQueueBucket.ts";
import { RestManager } from "./restManager.ts";

/** Cleans up the queues by checking if there is nothing left and removing it. */
export function cleanupQueues(rest: RestManager) {
  for (const [key, queue] of rest.pathQueues) {
    // rest.debug(`[REST - cleanupQueues] Running for of loop. ${key}`);
    if (!isQueueClearable(queue)) continue;

    // REMOVE IT FROM CACHE
    setTimeout(() => {
      clearQueue(rest, key, queue);
    }, 5000);
  }

  // NO QUEUE LEFT, DISABLE THE QUEUE
  if (!rest.pathQueues.size) rest.processingQueue = false;
}

export function clearQueue(rest: RestManager, key: string, queue: QueueBucket) {
  if (!isQueueClearable(queue)) return;

  rest.pathQueues.delete(key);
}

export function isQueueClearable(queue: QueueBucket) {
  if (queue.firstRequest) return false;
  if (queue.waiting.length) return false;
  if (queue.pending.length) return false;
  if (!queue.interval) return false;
  if (queue.processing) return false;
  if (queue.processingPending) return false;

  return true;
}
