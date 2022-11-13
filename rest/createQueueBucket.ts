import { delay } from "../util/utils.ts";
import { RestPayload, RestRequest } from "./rest.ts";

/**
 * A invalid request bucket is used in a similar manner as a leaky bucket but a invalid request bucket can be refilled as needed.
 * It's purpose is to make sure the bot does not hit the limit to getting a 1 hr ban.
 *
 * @param options The options used to configure this bucket.
 * @returns RefillingBucket
 */
export function createQueueBucket(options: QueueBucketOptions): QueueBucket {
  const bucket: QueueBucket = {
    used: options.used ?? 0,
    max: options.max ?? 1,
    interval: options.interval ?? 0,
    timeoutId: options.timeoutId ?? 0,
    processing: false,

    waiting: [],

    requestsAllowed: function () {
      return bucket.max - bucket.used;
    },

    isRequestAllowed: function () {
      return bucket.requestsAllowed() > 0;
    },

    waitUntilRequestAvailable: async function () {
      return new Promise(async (resolve) => {
        // If whatever amount of requests is left is more than the safety margin, allow the request
        if (bucket.isRequestAllowed()) {
          bucket.used++;
          resolve();
        } else {
          console.log("[BUCKET] Request NOT Allowed");
          bucket.waiting.push(resolve);
          await bucket.processWaiting();
        }
      });
    },

    processWaiting: async function () {
      // If already processing, that loop will handle all waiting requests.
      if (bucket.processing) {
        console.log("[BUCKET] Bucket is processing.");
        return;
      }

      // Mark as processing so other loops don't start
      bucket.processing = true;

      while (bucket.waiting.length) {
        console.log("[BUCKET] processing waiting loop");
        if (bucket.isRequestAllowed()) {
          console.log("[BUCKET] processing waiting loop", true);
          bucket.used++;
          // Resolve the next item in the queue
          bucket.waiting.shift()?.();
        } else {
          console.log("[BUCKET] processing waiting loop", false);
          await delay(1000);
        }
      }

      console.log("[BUCKET] Finished waiting loop");
      // Mark as false so next pending request can be triggered by new loop.
      bucket.processing = false;
    },

    handleCompletedRequest: function (code) {
      console.log("[BUCKET] Completed request");
    },

    makeRequest: function (options: BucketRequest) {
      bucket.waiting.push(options);
      bucket.processWaiting();
    },
  };

  return bucket;
}

export interface QueueBucketOptions {
  /** How many requests are already used up. Defaults to 0 */
  used?: number;
  /** Max number of requests allowed in this bucket. Defaults to 1. */
  max?: number;
  /** The time in milliseconds that discord allows to make the max number of invalid requests. Defaults to 0 */
  interval?: number;
  /** timer to reset to 0 */
  timeoutId?: number;
}

export interface QueueBucket {
  /** Amount of requests that have been used. */
  used: number;
  /** Max requests for this bucket. Defaults to 1. */
  max: number;
  /** The time that discord allows to make the max number of requests. Defaults to 0 */
  interval: number;
  /** timer to reset to 0 */
  timeoutId: number;
  /** The requests that are currently pending. */
  waiting: ((value: void | PromiseLike<void>) => void)[];
  /** Whether or not the waiting queue is already processing. */
  processing: boolean;

  /** Gives the number of requests that are currently allowed. */
  requestsAllowed: () => number;
  /** Checks if a request is allowed at this time. */
  isRequestAllowed: () => boolean;
  /** Waits until a request is available */
  waitUntilRequestAvailable: () => Promise<void>;
  /** Begins processing the waiting queue of requests. */
  processWaiting: () => Promise<void>;
  /** Handler for whenever a request is validated. This should update the requested values or trigger any other necessary stuff. */
  handleCompletedRequest: (code: number) => void;
  /** Adds a request to the queue. */
  makeRequest: (options: BucketRequest) => void;
}

export interface BucketRequest {
  request: RestRequest;
  payload: RestPayload;
}
