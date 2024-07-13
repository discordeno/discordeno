import { delay, logger } from '@discordeno/utils'

/**
 * A invalid request bucket is used in a similar manner as a leaky bucket but a invalid request bucket can be refilled as needed.
 * It's purpose is to make sure the bot does not hit the limit to getting a 1 hr ban.
 *
 * @param options The options used to configure this bucket.
 * @returns RefillingBucket
 */
export function createInvalidRequestBucket(options: InvalidRequestBucketOptions): InvalidRequestBucket {
  const bucket: InvalidRequestBucket = {
    invalidRequests: options.current ?? 0,
    max: options.max ?? 10000,
    interval: options.interval ?? 600_000, // 10 minutes
    resetAt: options.resetAt,
    safety: options.safety ?? 1,
    errorStatuses: options.errorStatuses ?? [401, 403, 429],
    activeRequests: options.requested ?? 0,
    processing: false,
    logger: options.logger ?? logger,

    waiting: [],

    requestsAllowed: function () {
      if (bucket.resetAt !== undefined && Date.now() >= bucket.resetAt) {
        bucket.invalidRequests = 0
        bucket.resetAt = Date.now() + bucket.interval
      }

      return bucket.max - bucket.invalidRequests - bucket.activeRequests - bucket.safety
    },

    isRequestAllowed: function () {
      return bucket.requestsAllowed() > 0
    },

    waitUntilRequestAvailable: async function () {
      return await new Promise(async (resolve) => {
        // If whatever amount of requests is left is more than the safety margin, allow the request
        if (bucket.isRequestAllowed()) {
          bucket.activeRequests += 1
          resolve()
        } else {
          bucket.waiting.push(resolve)
          await bucket.processWaiting()
        }
      })
    },

    processWaiting: async function () {
      // If already processing, that loop will handle all waiting requests.
      if (bucket.processing) return

      // Mark as processing so other loops don't start
      bucket.processing = true

      while (bucket.waiting.length > 0) {
        bucket.logger.info(
          `[InvalidBucket] processing waiting queue while loop ran with ${bucket.waiting.length} pending requests to be made. ${JSON.stringify(
            bucket,
          )}`,
        )

        if (!bucket.isRequestAllowed() && bucket.resetAt !== undefined) {
          bucket.logger.warn(
            `[InvalidBucket] processing waiting queue is now paused until more requests are available. ${
              bucket.waiting.length
            } pending requests. ${JSON.stringify(bucket)}`,
          )
          await delay(bucket.resetAt - Date.now())
        }

        bucket.activeRequests += 1
        // Resolve the next item in the queue
        bucket.waiting.shift()?.()
      }

      // Mark as false so next pending request can be triggered by new loop.
      bucket.processing = false
    },

    handleCompletedRequest: function (code, sharedScope) {
      // Since request is complete, we can remove one from requested.
      bucket.activeRequests -= 1
      // Since it is as a valid request, we don't need to do anything
      if (!bucket.errorStatuses.includes(code)) return
      // Shared scope is not considered invalid
      if (code === 429 && sharedScope) return

      // INVALID REQUEST WAS MADE
      if (bucket.resetAt === undefined) {
        bucket.resetAt = Date.now() + bucket.interval
      }

      bucket.invalidRequests += 1
      bucket.logger.warn(`[InvalidBucket] an invalid request was made. Increasing invalidRequests count to ${bucket.invalidRequests}`)
    },
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
  /** When the timeout for the bucket has started at. */
  resetAt?: number
  /** how safe to be from max. Defaults to 1 */
  safety?: number
  /** The request statuses that count as an invalid request. */
  errorStatuses?: number[]
  /** The amount of requests that were requested from this bucket. */
  requested?: number
  /** The logger that will be used for the bucket */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}

export interface InvalidRequestBucket {
  /** current invalid amount */
  invalidRequests: number
  /** max invalid requests allowed until ban. Defaults to 10,000 */
  max: number
  /** The time that discord allows to make the max number of invalid requests. Defaults to 10 minutes */
  interval: number
  /** When the timeout for this bucket has started at. */
  resetAt: number | undefined
  /** how safe to be from max. Defaults to 1 */
  safety: number
  /** The request statuses that count as an invalid request. */
  errorStatuses: number[]
  /** The amount of requests that were requested from this bucket. */
  activeRequests: number
  /** The requests that are currently pending. */
  waiting: Array<(value: void | PromiseLike<void>) => void>
  /** Whether or not the waiting queue is already processing. */
  processing: boolean
  /** The logger that will be used for the bucket */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>

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
