import logger from './logger.js'
import { delay } from './utils.js'

export class LeakyBucket implements LeakyBucketOptions {
  max: number
  refillInterval: number
  refillAmount: number

  /** The amount of requests that have been used up already. */
  used: number = 0
  /** The queue of requests to acquire an available request. Mapped by <shardId, resolve()> */
  queue: Array<(value: void | PromiseLike<void>) => void> = []
  /** Whether or not the queue is already processing. */
  processing: boolean = false
  /** The timeout id for the timer to reduce the used amount by the refill amount. */
  timeoutId?: NodeJS.Timeout
  /** The timestamp in milliseconds when the next refill is scheduled. */
  refillsAt?: number
  /** Logger used in the leaky bucket */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>

  constructor(options?: LeakyBucketOptions) {
    this.max = options?.max ?? 1
    this.refillAmount = options?.refillAmount ? (options.refillAmount > this.max ? this.max : options.refillAmount) : 1
    this.refillInterval = options?.refillInterval ?? 5000
    this.logger = options?.logger ?? logger
  }

  /** The amount of requests that still remain. */
  get remaining(): number {
    return this.max < this.used ? 0 : this.max - this.used
  }

  /** Refills the bucket as needed. */
  refillBucket(): void {
    this.logger.debug(`[LeakyBucket] Timeout for leaky bucket requests executed. Refilling bucket.`)
    // Lower the used amount by the refill amount
    this.used = this.refillAmount > this.used ? 0 : this.used - this.refillAmount
    // Reset the refillsAt timestamp since it just got refilled
    this.refillsAt = undefined
    // Reset the timeoutId
    clearTimeout(this.timeoutId)
    this.timeoutId = undefined

    if (this.used > 0) {
      this.timeoutId = setTimeout(() => {
        this.refillBucket()
      }, this.refillInterval)
      this.refillsAt = Date.now() + this.refillInterval
    }
  }

  /** Begin processing the queue. */
  async processQueue(): Promise<void> {
    this.logger.debug('[LeakyBucket] Processing queue')

    // There is already a queue that is processing
    if (this.processing) return this.logger.debug('[LeakyBucket] Queue is already processing.')

    this.processing = true

    // Begin going through the queue.
    while (this.queue.length) {
      if (this.remaining) {
        this.logger.debug(`[LeakyBucket] Processing queue. Remaining: ${this.remaining} Length: ${this.queue.length}`)
        // Resolves the promise allowing the paused execution of this request to resolve and continue.
        this.queue.shift()?.()
        // A request can be made
        this.used++

        // Create a new timeout for this request if none exists.
        if (!this.timeoutId) {
          this.logger.debug(`[LeakyBucket] Creating new timeout for leaky bucket requests.`)

          this.timeoutId = setTimeout(() => {
            this.refillBucket()
          }, this.refillInterval)
          // Set the time for when this refill will occur.
          this.refillsAt = Date.now() + this.refillInterval
        }
      }

      // Check if a refill is scheduled, since we have used up all available requests
      else if (this.refillsAt) {
        const now = Date.now()
        // If there is time left until next refill, just delay execution.
        if (this.refillsAt > now) {
          this.logger.debug(`[LeakyBucket] Delaying execution of leaky bucket requests for ${this.refillsAt - now}ms`)
          await delay(this.refillsAt - now)
          this.logger.debug(`[LeakyBucket] Resuming execution`)
        }

        // If the refillsAt has passed but the timeout didn't yet execute delay the execution
        else {
          this.logger.debug(`[LeakyBucket] Delaying execution of leaky bucket requests for 1000ms`)
          await delay(1000)
        }
      }
    }

    // Loop has ended mark false so it can restart later when needed
    this.processing = false
  }

  /** Pauses the execution until the request is available to be made. */
  async acquire(highPriority?: boolean): Promise<void> {
    return await new Promise((resolve) => {
      // High priority requests get added to the start of the queue
      if (highPriority) this.queue.unshift(resolve)
      // All other requests get pushed to the end.
      else this.queue.push(resolve)

      // Each request should trigger the queue to be processed.
      void this.processQueue()
    })
  }
}

export interface LeakyBucketOptions {
  /**
   * Max requests allowed at once.
   * @default 1
   */
  max?: number
  /**
   * Interval in milliseconds between refills.
   * @default 5000
   */
  refillInterval?: number
  /**
   * Amount of requests to refill at each interval.
   * @default 1
   */
  refillAmount?: number
  /**
   * The logger that the leaky bucket will use
   * @default logger // The logger exported by `@discordeno/utils`
   */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
}
