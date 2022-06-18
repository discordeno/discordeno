import { PickPartial } from "../types/shared.ts";
import { delay } from "./delay.ts";

/** A Leaky Bucket.
 * Useful for rate limiting purposes.
 * This uses `performance.now()` instead of `Date.now()` for higher accuracy.
 *
 * NOTE: This bucket is lazy, means it only updates when a related method is called.
 */
export interface LeakyBucket {
  // ----------
  // PROPERTIES
  // ----------

  /** How many tokens this bucket can hold. */
  max: number;
  /** Amount of tokens gained per interval.
   * If bigger than `max` it will be pressed to `max`.
   */
  refillAmount: number;
  /** Interval at which the bucket gains tokens. */
  refillInterval: number;

  // ----------
  // METHODS
  // ----------

  /** Acquire tokens from the bucket.
   * Resolves when the tokens are acquired and available.
   * @param {boolean} [highPriority=false] Whether this acquire is should be done asap.
   */
  acquire(amount: number, highPriority?: boolean): Promise<void>;

  /** Returns the number of milliseconds until the next refill. */
  nextRefill(): number;

  /** Current tokens in the bucket. */
  tokens(): number;

  // ----------
  // INTERNAL STATES
  // ----------

  /** @private Internal track of when the last refill of tokens was.
   * DO NOT TOUCH THIS! Unless you know what you are doing ofc :P
   */
  lastRefill: number;

  /** @private Internal state of whether currently it is allowed to acquire tokens.
   * DO NOT TOUCH THIS! Unless you know what you are doing ofc :P
   */
  allowAcquire: boolean;

  /** @private Internal number of currently available tokens.
   * DO NOT TOUCH THIS! Unless you know what you are doing ofc :P
   */
  tokensState: number;

  /** @private Internal array of promises necessary to guarantee no race conditions.
   * DO NOT TOUCH THIS! Unless you know what you are doing ofc :P
   */
  waiting: ((_?: unknown) => void)[];
}

export function createLeakyBucket(
  { max, refillInterval, refillAmount, tokens, waiting, ...rest }:
    & Omit<
      PickPartial<
        LeakyBucket,
        "max" | "refillInterval" | "refillAmount"
      >,
      "tokens"
    >
    & {
      /** Current tokens in the bucket.
       * @default max
       */
      tokens?: number;
    },
): LeakyBucket {
  return {
    max,
    refillInterval,
    refillAmount: refillAmount > max ? max : refillAmount,
    lastRefill: performance.now(),
    allowAcquire: true,

    nextRefill: function () {
      return nextRefill(this);
    },

    tokens: function () {
      return updateTokens(this);
    },

    acquire: async function (amount, highPriority) {
      return await acquire(this, amount, highPriority);
    },

    tokensState: tokens ?? max,
    waiting: waiting ?? [],

    ...rest,
  };
}

/** Update the tokens of that bucket.
 * @returns {number} The amount of current available tokens.
 */
function updateTokens(bucket: LeakyBucket): number {
  const timePassed = performance.now() - bucket.lastRefill;
  const missedRefills = Math.floor(timePassed / bucket.refillInterval);

  // The refill shall not exceed the max amount of tokens.
  bucket.tokensState = Math.min(bucket.tokensState + (bucket.refillAmount * missedRefills), bucket.max);
  bucket.lastRefill += bucket.refillInterval * missedRefills;

  return bucket.tokensState;
}

function nextRefill(bucket: LeakyBucket): number {
  // Since this bucket is lazy update the tokens before calculating the next refill.
  updateTokens(bucket);

  return (performance.now() - bucket.lastRefill) + bucket.refillInterval;
}

async function acquire(bucket: LeakyBucket, amount: number, highPriority = false): Promise<void> {
  // To prevent the race condition of 2 acquires happening at once,
  // check whether its currently allowed to acquire.
  if (!bucket.allowAcquire) {
    // create, push, and wait until the current running acquiring is finished.
    await new Promise((resolve) => {
      if (highPriority) {
        bucket.waiting.unshift(resolve);
      } else {
        bucket.waiting.push(resolve);
      }
    });

    // Somehow another acquire has started,
    // so need to wait again.
    if (!bucket.allowAcquire) {
      return await acquire(bucket, amount);
    }
  }

  bucket.allowAcquire = false;
  // Since the bucket is lazy update the tokens now,
  // and also get the current amount of available tokens
  let currentTokens = updateTokens(bucket);

  // It's possible that more than available tokens have been acquired,
  // so calculate the amount of milliseconds to wait until this acquire is good to go.
  if (currentTokens < amount) {
    const tokensNeeded = amount - currentTokens;
    let refillsNeeded = Math.ceil(tokensNeeded / bucket.refillAmount);

    const waitTime = bucket.refillInterval * refillsNeeded;
    await delay(waitTime);

    // Update the tokens again to ensure nothing has been missed.
    updateTokens(bucket);
  }

  // In order to not subtract too much from the tokens,
  // calculate what is actually needed to subtract.
  const toSubtract = (amount % bucket.refillAmount) || amount;
  bucket.tokensState -= toSubtract;

  // Allow the next acquire to happen.
  bucket.allowAcquire = true;
  // If there is an acquire waiting, let it continue.
  bucket.waiting.shift()?.();
}
