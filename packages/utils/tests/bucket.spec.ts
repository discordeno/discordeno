import { expect } from 'chai'
import sinon from 'sinon'
import * as bucketJs from '../src/bucket.js'
import { createLeakyBucket, updateTokens } from '../src/bucket.js'

describe('bucket.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  describe('createLeakyBucket function', () => {
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
      const bucket = createLeakyBucket(options)
      expect(bucket.max).to.equal(options.max)
      expect(bucket.refillInterval).to.equal(options.refillInterval)
      expect(bucket.refillAmount).to.equal(options.refillAmount)
      expect(bucket.tokensState).to.equal(options.tokens)
      // @ts-expect-error
      expect(bucket.someThingElse).to.equal(options.someThingElse)
    })

    it('will return bucket with refillAmount within max', () => {
      const options = {
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
      }
      const bucket = createLeakyBucket(options)
      expect(bucket.refillAmount).to.equal(options.max)
    })

    it('will return bucket with tokensState within max', () => {
      const options = {
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
      }
      const bucket = createLeakyBucket(options)
      expect(bucket.refillAmount).to.equal(options.max)
    })

    it('will return bucket with default property', () => {
      const bucket = createLeakyBucket({
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
        tokens: 4004,
      })
      expect(bucket.lastRefill).to.equal(Date.now())
      expect(bucket.allowAcquire).to.equal(true)
      expect(bucket.waiting).to.deep.equal([])
    })

    it.skip('will call nextRefill with itself when called nextRefill', () => {
      sinon.stub(bucketJs, 'nextRefill')
    })

    it.skip('will call updateTokens with itself when called tokens', () => {
      sinon.stub(bucketJs, 'nextRefill')
    })

    it.skip('will call acquire with itself when called acquire', () => {
      sinon.stub(bucketJs, 'nextRefill')
    })
  })
  describe('updateTokens function', () => {
    it('will not increase bucket token after <1 refillInterval passed', () => {
      const bucket = createLeakyBucket({
        max: 10,
        refillInterval: 100,
        refillAmount: 1,
        tokens: 0,
      })
      expect(bucket.tokens()).to.equal(0)
      updateTokens(bucket)
      expect(bucket.tokens()).to.equal(0)
      clock.tick(99)
      expect(bucket.tokens()).to.equal(0)
    })

    it('will increase 5 bucket token after 5 refillInterval passed', () => {
      const bucket = createLeakyBucket({
        max: 10,
        refillInterval: 100,
        refillAmount: 1,
        tokens: 1,
      })
      expect(bucket.tokens()).to.equal(1)
      updateTokens(bucket)
      expect(bucket.tokens()).to.equal(1)
      clock.tick(599)
      expect(bucket.tokens()).to.equal(6)
    })

    it('will increate lastRefill according to number of refill', () => {
      const bucket = createLeakyBucket({
        max: 10,
        refillInterval: 100,
        refillAmount: 1,
        tokens: 1,
      })
      expect(bucket.lastRefill).to.equal(Date.now())
      clock.tick(699)
      updateTokens(bucket)
      expect(bucket.lastRefill).to.equal(Date.now() - 99)
    })

    it('will return bucket token of the bucket', () => {
      const bucket = createLeakyBucket({
        max: 10,
        refillInterval: 100,
        refillAmount: 1,
        tokens: 1,
      })
      expect(updateTokens(bucket)).to.equal(1)
      clock.tick(500)
      expect(updateTokens(bucket)).to.equal(6)
    })
  })
  describe('nextRefill function', () => {})
  describe('acquire function', () => {})
})
