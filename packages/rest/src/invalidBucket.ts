import { delay } from '@discordeno/utils'

/**
 * A invalid request bucket is used in a similar manner as a leaky bucket but a invalid request bucket can be refilled as needed.
 * It's purpose is to make sure the bot does not hit the limit to getting a 1 hr ban.
 *
 * @param options The options used to configure this bucket.
 * @returns RefillingBucket
 */
export function createInvalidRequestBucket (
  options: InvalidRequestBucketOptions
): InvalidRequestBucket {
  const bucket: InvalidRequestBucket = {
    current: options.current ?? 0,
    max: options.max ?? 10000,
    interval: options.interval ?? 600000,
    timeoutId: options.timeoutId,
    safety: options.safety ?? 1,
    errorStatuses: options.errorStatuses ?? [401, 403, 429],
    requested: options.requested ?? 0,
    processing: false,

    waiting: [],

    requestsAllowed: function () {
      return bucket.max - bucket.current - bucket.requested - bucket.safety
    },

    isRequestAllowed: function () {
      return bucket.requestsAllowed() > 0
    },

    waitUntilRequestAvailable: async function () {
      // eslint-disable-next-line no-async-promise-executor
      return await new Promise(async (resolve) => {
        // If whatever amount of requests is left is more than the safety margin, allow the request
        if (bucket.isRequestAllowed()) {
          bucket.requested++
          resolve()
        } else {
          bucket.waiting.push(resolve)
          await bucket.processWaiting()
        }
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
          bucket.requested++
          // Resolve the next item in the queue
          bucket.waiting.shift()?.()
        } else {
          await delay(1000)
        }
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processing = false
    },

    handleCompletedRequest: function (code, sharedScope) {
      // Since request is complete, we can remove one from requested.
      bucket.requested--
      // Since it is as a valid request, we don't need to do anything
      if (!bucket.errorStatuses.includes(code)) return
      // Shared scope is not considered invalid
      if (code === 429 && sharedScope) return

      // INVALID REQUEST WAS MADE

      // Mark a request has been invalid
      bucket.current++
      // If a timeout was not started, start a timeout to reset this bucket
      if (bucket.timeoutId === undefined) {
        bucket.timeoutId = setTimeout(() => {
          bucket.current = 0
          bucket.timeoutId = undefined
        }, bucket.interval)
      }
    }
  }

  return bucket
}

export interface InvalidRequestBucketOptions {
  /** current invalid amount */
  current?: number
  /** max invalid requests allowed until ban. Defaults to 10,000 */
  max?: number
  /** The time that discord allows to make the max number of invalid requests. Defaults to 10 minutes */
  interval?: number
  /** timer to reset to 0 */
  timeoutId?: NodeJS.Timeout
  /** how safe to be from max. Defaults to 1 */
  safety?: number
  /** The request statuses that count as an invalid request. */
  errorStatuses?: number[]
  /** The amount of requests that were requested from this bucket. */
  requested?: number
}

export interface InvalidRequestBucket {
  /** current invalid amount */
  current: number
  /** max invalid requests allowed until ban. Defaults to 10,000 */
  max: number
  /** The time that discord allows to make the max number of invalid requests. Defaults to 10 minutes */
  interval: number
  /** timer to reset to 0 */
  timeoutId: NodeJS.Timeout | undefined
  /** how safe to be from max. Defaults to 1 */
  safety: number
  /** The request statuses that count as an invalid request. */
  errorStatuses: number[]
  /** The amount of requests that were requested from this bucket. */
  requested: number
  /** The requests that are currently pending. */
  waiting: Array<(value: void | PromiseLike<void>) => void>
  /** Whether or not the waiting queue is already processing. */
  processing: boolean

  /** Gives the number of requests that are currently allowed. */
  requestsAllowed: () => number
  /** Checks if a request is allowed at this time. */
  isRequestAllowed: () => boolean
  /** Waits until a request is available */
  waitUntilRequestAvailable: () => Promise<void>
  /** Begins processing the waiting queue of requests. */
  processWaiting: () => Promise<void>
  /** Handler for whenever a request is validated. This should update the requested values or trigger any other necessary stuff. */
  handleCompletedRequest: (code: number, sharedScope: boolean) => void
}
