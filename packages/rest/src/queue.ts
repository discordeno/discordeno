import { delay, logger } from '@discordeno/utils'
import type { RestManager, SendRequestOptions } from './types.js'

export class Queue {
  /** The rest manager */
  rest: RestManager
  /** Amount of requests that have are remaining. Defaults to 1. */
  remaining: number = 1
  /** Max requests for this this. Defaults to 1. */
  max: number = 1
  /** The time that discord allows to make the max number of requests. Defaults to 0 */
  interval: number = 0
  /** timer to reset to 0 */
  timeoutId: NodeJS.Timeout | undefined
  /** The requests that are currently pending. */
  waiting: Array<(value: void | PromiseLike<void>) => void> = []
  /** The requests that are currently pending. */
  pending: SendRequestOptions[] = []
  /** Whether or not the waiting queue is already processing. */
  processing: boolean = false
  /** Whether or not the pending queue is already processing. */
  processingPending: boolean = false
  /** Whether the first request is pending. */
  firstRequest: boolean = false
  /** The url that all the requests in this queue are sent to. */
  url: string
  /** When requests started being made to determine when the interval will reset it. */
  frozenAt: number = 0
  /** The time in milliseconds to wait before deleting this queue if it is empty. Defaults to 60000(one minute). */
  deleteQueueDelay: number = 60000

  constructor(rest: RestManager, options: QueueOptions) {
    this.rest = rest
    this.url = options.url

    if (options.interval) this.interval = options.interval
    if (options.max) this.max = options.max
    if (options.remaining) this.remaining = options.remaining
    if (options.timeoutId) this.timeoutId = options.timeoutId
    if (options.deleteQueueDelay) this.deleteQueueDelay = options.deleteQueueDelay
  }

  /** Check if there is any remaining requests that are allowed. */
  isRequestAllowed(): boolean {
    return this.remaining > 0
  }

  /** Pauses the execution until a request is allowed to be made. */
  async waitUntilRequestAvailable(): Promise<void> {
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      // If whatever amount of requests is left is more than the safety margin, allow the request
      if (this.isRequestAllowed()) {
        // this.remaining++;
        resolve()
      } else {
        this.waiting.push(resolve)
        await this.processWaiting()
      }
    })
  }

  /** Process the queue of requests waiting to be handled. */
  async processWaiting(): Promise<void> {
    // If already processing, that loop will handle all waiting requests.
    if (this.processing) return
    // Mark as processing so other loops don't start
    this.processing = true

    while (this.waiting.length > 0) {
      logger.debug(`[Queue] ${this.url} process waiting while loop ran.`)
      if (this.isRequestAllowed()) {
        // Resolve the next item in the queue
        this.waiting.shift()?.()
      } else {
        await delay(1000)
      }
    }

    // Mark as false so next pending request can be triggered by new loop.
    this.processing = false
  }

  /** Process the queue of all requests pending to be sent. */
  async processPending(): Promise<void> {
    // If already processing, that loop will handle all pending requests.
    if (this.processingPending || !this.pending.length) return

    // Mark as processing so other loops don't start
    this.processingPending = true

    while (this.pending.length > 0) {
      logger.debug(`Queue ${this.url} process pending while loop ran with ${this.pending.length}.`)
      if (!this.firstRequest && !this.isRequestAllowed()) {
        const now = Date.now()
        const future = this.frozenAt + this.interval
        await delay(future > now ? future - now : 1000)
        continue
      }

      const request = this.pending[0]
      if (request) {
        const basicURL = this.rest.simplifyUrl(request.url, request.method)

        // IF THIS URL IS STILL RATE LIMITED, TRY AGAIN
        // If this url is still rate limited, try again
        const urlResetIn = this.rest.checkRateLimits(basicURL)
        if (urlResetIn) await delay(urlResetIn)

        // IF A BUCKET EXISTS, CHECK THE BUCKET'S RATE LIMITS
        const bucketResetIn = request.bucketId ? this.rest.checkRateLimits(request.bucketId) : false
        if (bucketResetIn) await delay(bucketResetIn)

        this.firstRequest = false
        this.remaining--

        if (this.timeoutId && this.remaining === 0 && this.interval !== 0) {
          this.timeoutId = setTimeout(() => {
            this.remaining = this.max
            this.timeoutId = undefined
          }, this.interval)
        }

        // Remove from queue, we are executing it.
        this.pending.shift()
        // Check if this request is able to be made globally
        await this.rest.invalidBucket.waitUntilRequestAvailable()

        await this.rest
          .sendRequest(request)
          // Should be handled in sendRequest, this catch just prevents bots from dying
          .catch(() => null)
      }
    }

    logger.debug(`Queue ${this.url} process pending while loop exited with ${this.pending.length}.`)

    // Mark as false so next pending request can be triggered by new loop.
    this.processingPending = false
    this.cleanup()
  }

  handleCompletedRequest(headers: { max?: number; interval?: number; remaining?: number }): void {
    if (headers.max === 0) {
      this.remaining++
      return
    }

    if (!this.frozenAt) this.frozenAt = Date.now()
    if (headers.interval !== undefined) this.interval = headers.interval
    if (headers.remaining !== undefined) this.remaining = headers.remaining

    if (this.remaining <= 1) {
      this.timeoutId = setTimeout(() => {
        this.remaining = this.max
        this.timeoutId = undefined
      }, headers.interval)
    }
  }

  /** Checks if a request is available and adds it to the queue. Also triggers queue processing if not already processing. */
  async makeRequest(options: SendRequestOptions): Promise<void> {
    await this.waitUntilRequestAvailable()
    this.pending.push(options)
    this.processPending()
  }

  /** Cleans up the queue by checking if there is nothing left and removing it. */
  cleanup(): void {
    if (!this.isQueueClearable()) {
      this.processPending()
      return
    }

    logger.debug(`[Queue] ${this.url}. Delaying delete for ${this.deleteQueueDelay}ms`)
    // Delete in a minute giving a bit of time to allow new requests that may reuse this queue
    setTimeout(async () => {
      if (!this.isQueueClearable()) {
        logger.debug(`[Queue] ${this.url}. is not clearable. Restarting processing of queue.`)
        this.processPending()
        return
      }

      logger.debug(`[Queue] ${this.url}. Deleting`)
      if (this.timeoutId) clearTimeout(this.timeoutId)
      // No requests have been requested for this queue so we nuke this queue
      this.rest.queues.delete(this.url)
      logger.debug(`[Queue] ${this.url}. Deleted! Remaining: (${this.rest.queues.size})`, [...this.rest.queues.keys()])
      if (this.rest.queues.size) this.processPending()
    }, this.deleteQueueDelay)
  }

  /** Simply checks if the queue is able to be cleared or it has requests pending. */
  isQueueClearable(): boolean {
    if (this.firstRequest) return false
    if (this.waiting.length > 0) return false
    if (this.pending.length > 0) return false
    if (this.interval === 0) return false
    if (this.processing) return false
    if (this.processingPending) return false

    return true
  }
}

export interface QueueOptions {
  /** How many requests are remaining. Defaults to 1 */
  remaining?: number
  /** Max number of requests allowed in this this. Defaults to 1. */
  max?: number
  /** The time in milliseconds that discord allows to make the max number of invalid requests. Defaults to 0 */
  interval?: number
  /** timer to reset to 0 */
  timeoutId?: NodeJS.Timeout
  /** The url this queue will be handling. */
  url: string
  /** The time in milliseconds to wait before deleting this queue if it is empty. Defaults to 60000(one minute). */
  deleteQueueDelay?: number
}
