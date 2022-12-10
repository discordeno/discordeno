import { delay } from '@discordeno/utils'
import type { RestPayload, RestRequest } from './rest.js'
import type { RestManager } from './restManager.js'

/**
 * A queue bucket is used in a similar manner as a leaky bucket.
 *
 * @param options The options used to configure this bucket.
 * @returns RefillingBucket
 */
export function createQueueBucket (
  rest: RestManager,
  options: QueueBucketOptions
): QueueBucket {
  const bucket: QueueBucket = {
    remaining: options.remaining ?? 1,
    max: options.max ?? 1,
    interval: options.interval ?? 0,
    timeoutId: options.timeoutId,
    processing: false,
    processingPending: false,
    firstRequest: true,

    waiting: [],
    pending: [],

    isRequestAllowed: function () {
      return bucket.remaining > 0
    },

    waitUntilRequestAvailable: async function () {
      return await new Promise((resolve) => {
        void (async () => {
          // If whatever amount of requests is left is more than the safety margin, allow the request
          if (bucket.isRequestAllowed()) {
            // bucket.remaining++;
            resolve()
          } else {
            bucket.waiting.push(resolve)
            await bucket.processWaiting()
          }
        })()
      })
    },

    processWaiting: async function () {
      // If already processing, that loop will handle all waiting requests.
      if (bucket.processing) {
        return
      }

      // Mark as processing so other loops don't start
      bucket.processing = true

      while (bucket.waiting.length > 0) {
        if (bucket.isRequestAllowed()) {
          // Resolve the next item in the queue
          bucket.waiting.shift()?.()
        } else {
          await delay(1000)
        }
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processing = false
    },

    processPending: async function () {
      // If already processing, that loop will handle all pending requests.
      if (bucket.processingPending) {
        return
      }

      // Mark as processing so other loops don't start
      bucket.processingPending = true

      while (bucket.pending.length > 0) {
        if (bucket.firstRequest || bucket.isRequestAllowed()) {
          if (bucket.pending.length > 0) {
            const queuedRequest = bucket.pending[0]
            const basicURL = rest.simplifyUrl(
              queuedRequest.request.url,
              queuedRequest.request.method
            )

            // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
            const urlResetIn = rest.checkRateLimits(rest, basicURL)
            if (urlResetIn !== false) {
              setTimeout(() => {
                void bucket.processPending()
              }, urlResetIn)
              break
            }

            // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
            const bucketResetIn =
              queuedRequest.payload.bucketId !== undefined
                ? rest.checkRateLimits(rest, queuedRequest.payload.bucketId)
                : false
            if (bucketResetIn !== false) {
              setTimeout(() => {
                void bucket.processPending()
              }, bucketResetIn)
              break
            }

            bucket.firstRequest = false
            bucket.remaining--

            if (
              bucket.timeoutId === undefined &&
              bucket.remaining === 0 &&
              bucket.interval !== 0
            ) {
              bucket.timeoutId = setTimeout(() => {
                bucket.remaining = bucket.max
                bucket.timeoutId = undefined
              }, bucket.interval)
            }

            // Remove from queue, we are executing it.
            bucket.pending.shift()
            void rest.processGlobalQueue(rest, {
              ...queuedRequest,
              urlToUse: queuedRequest.request.url,
              basicURL
            })
          }
        } else {
          await delay(1000)
        }
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processingPending = false
      rest.cleanupQueues(rest)
    },

    handleCompletedRequest: function (headers) {
      bucket.max = headers.max
      bucket.interval = headers.interval
      bucket.remaining = headers.remaining

      if (bucket.remaining <= 1) {
        bucket.timeoutId = setTimeout(() => {
          bucket.remaining = bucket.max
          bucket.timeoutId = undefined
        }, headers.interval)
      }
    },

    makeRequest: async function (options: BucketRequest) {
      await bucket.waitUntilRequestAvailable()
      bucket.pending.push(options)
      void bucket.processPending()
    }
  }

  return bucket
}

export interface QueueBucketOptions {
  /** How many requests are remaining. Defaults to 1 */
  remaining?: number
  /** Max number of requests allowed in this bucket. Defaults to 1. */
  max?: number
  /** The time in milliseconds that discord allows to make the max number of invalid requests. Defaults to 0 */
  interval?: number
  /** timer to reset to 0 */
  timeoutId?: NodeJS.Timeout
}

export interface QueueBucket {
  /** Amount of requests that have are remaining. Defaults to 1. */
  remaining: number
  /** Max requests for this bucket. Defaults to 1. */
  max: number
  /** The time that discord allows to make the max number of requests. Defaults to 0 */
  interval: number
  /** timer to reset to 0 */
  timeoutId: NodeJS.Timeout | undefined
  /** The requests that are currently pending. */
  waiting: Array<(value: void | PromiseLike<void>) => void>
  /** The requests that are currently pending. */
  pending: BucketRequest[]
  /** Whether or not the waiting queue is already processing. */
  processing: boolean
  /** Whether or not the pending queue is already processing. */
  processingPending: boolean
  /** Whether the first request is pending. */
  firstRequest: boolean

  /** Checks if a request is allowed at this time. */
  isRequestAllowed: () => boolean
  /** Waits until a request is available */
  waitUntilRequestAvailable: () => Promise<void>
  /** Begins processing the waiting queue of requests. */
  processWaiting: () => Promise<void>
  /** Begins processing the pending queue of requests. */
  processPending: () => Promise<void>
  /** Handler for whenever a request is validated. This should update the requested values or trigger any other necessary stuff. */
  handleCompletedRequest: (headers: {
    remaining: number
    interval: number
    max: number
  }) => void
  /** Adds a request to the queue. */
  makeRequest: (options: BucketRequest) => Promise<void>
}

export interface BucketRequest {
  request: RestRequest
  payload: RestPayload
}
