import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { LeakyBucket } from '../src/bucket.js'

describe('bucket.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  describe('LeakyBucket function', () => {
    it('will return bucket with given options', () => {
      const options = {
        max: 6006,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
        someThingElse: {
          thing: 'else',
        },
      }
      const bucket = new LeakyBucket(options)
      expect(bucket.max).to.equal(options.max)
      expect(bucket.refillInterval).to.equal(options.refillInterval)
      expect(bucket.refillAmount).to.equal(options.refillAmount)
    })

    it('will return bucket with refillAmount within max', () => {
      const options = {
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
      }
      const bucket = new LeakyBucket(options)
      expect(bucket.refillAmount).to.equal(options.max)
    })

    it('will return bucket with tokensState within max', () => {
      const options = {
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
      }
      const bucket = new LeakyBucket(options)
      expect(bucket.refillAmount).to.equal(options.max)
    })

    it('will return bucket with default property', () => {
      const bucket = new LeakyBucket({
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
      })
      expect(bucket.queue).to.deep.equal([])
    })
  })
})
