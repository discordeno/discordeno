import { delay } from "../util/utils.ts";
import { RestPayload, RestRequest } from "./rest.ts";
import { RestManager } from "./restManager.ts";

/**
 * A queue bucket is used in a similar manner as a leaky bucket.
 *
 * @param options The options used to configure this bucket.
 * @returns RefillingBucket
 */
export function createQueueBucket(rest: RestManager, options: QueueBucketOptions): QueueBucket {
  const bucket: QueueBucket = {
    used: options.used ?? 0,
    max: options.max ?? 1,
    interval: options.interval ?? 0,
    timeoutId: options.timeoutId ?? 0,
    processing: false,
    processingPending: false,
    firstRequest: true,

    waiting: [],
    pending: [],

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
          bucket.waiting.push(resolve);
          await bucket.processWaiting();
        }
      });
    },

    processWaiting: async function () {
      // If already processing, that loop will handle all waiting requests.
      if (bucket.processing) {
        return;
      }

      // Mark as processing so other loops don't start
      bucket.processing = true;

      while (bucket.waiting.length) {
        if (bucket.isRequestAllowed()) {
          bucket.used++;
          // Resolve the next item in the queue
          bucket.waiting.shift()?.();
        } else {
          await delay(1000);
        }
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processing = false;
    },

    processPending: async function () {
      // If already processing, that loop will handle all pending requests.
      if (bucket.processingPending) {
        return;
      }

      // Mark as processing so other loops don't start
      bucket.processingPending = true;

      while (bucket.pending.length) {
        if (bucket.firstRequest || bucket.isRequestAllowed()) {
          bucket.firstRequest = false;
          bucket.used++;
          const [queuedRequest] = bucket.pending;
          if (queuedRequest) {
            const basicURL = rest.simplifyUrl(queuedRequest.request.url, queuedRequest.request.method);

            // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
            const urlResetIn = rest.checkRateLimits(rest, basicURL);
            if (urlResetIn) {
              setTimeout(() => {
                bucket.processPending();
              }, urlResetIn);
              break;
            }

            // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
            const bucketResetIn = queuedRequest.payload.bucketId
              ? rest.checkRateLimits(rest, queuedRequest.payload.bucketId)
              : false;
            if (bucketResetIn) {
              setTimeout(() => {
                bucket.processPending();
              }, bucketResetIn);
              break;
            }

            // Remove from queue, we are executing it.
            bucket.pending.shift();

            rest.processGlobalQueue(rest, {
              ...queuedRequest,
              urlToUse: queuedRequest.request.url,
              basicURL,
            });
          }
        } else {
          await delay(1000);
        }
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processingPending = false;
      rest.cleanupQueues(rest);
    },

    handleCompletedRequest: function (headers) {
      bucket.max = headers.max;
      bucket.interval = headers.interval;
      bucket.used = bucket.max - headers.remaining;

      if (!bucket.timeoutId) {
        bucket.timeoutId = setTimeout(() => {
          bucket.used = 0;
        });
      }
    },

    makeRequest: async function (options: BucketRequest) {
      await bucket.waitUntilRequestAvailable();
      bucket.pending.push(options);
      bucket.processPending();
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
  /** The requests that are currently pending. */
  pending: BucketRequest[];
  /** Whether or not the waiting queue is already processing. */
  processing: boolean;
  /** Whether or not the pending queue is already processing. */
  processingPending: boolean;
  /** Whether the first request is pending. */
  firstRequest: boolean;

  /** Gives the number of requests that are currently allowed. */
  requestsAllowed: () => number;
  /** Checks if a request is allowed at this time. */
  isRequestAllowed: () => boolean;
  /** Waits until a request is available */
  waitUntilRequestAvailable: () => Promise<void>;
  /** Begins processing the waiting queue of requests. */
  processWaiting: () => Promise<void>;
  /** Begins processing the pending queue of requests. */
  processPending: () => Promise<void>;
  /** Handler for whenever a request is validated. This should update the requested values or trigger any other necessary stuff. */
  handleCompletedRequest: (headers: { remaining: number; interval: number; max: number }) => void;
  /** Adds a request to the queue. */
  makeRequest: (options: BucketRequest) => Promise<void>;
}

export interface BucketRequest {
  request: RestRequest;
  payload: RestPayload;
}
