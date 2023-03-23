import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { LeakyBucket } from '../src/bucket.js'

const promiseState = async (p: Promise<any>): Promise<string> => {
  const t = {}
  return await Promise.race([p, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected',
  )
}

describe('bucket.ts', () => {
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  describe('LeakyBucket class', () => {
    it('will return bucket with given options', () => {
      const options = {
        max: 6006,
        refillInterval: 2002,
        refillAmount: 3003,
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
      }
      const bucket = new LeakyBucket(options)
      expect(bucket.refillAmount).to.equal(options.max)
    })

    it('will return bucket with tokensState within max', () => {
      const options = {
        max: 111,
        refillInterval: 2002,
        refillAmount: 3003,
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

    describe('remaining getter', () => {
      it('will return the remaining amount', async () => {
        const options = {
          max: 10,
          refillInterval: 2002,
          refillAmount: 1,
        }
        const bucket = new LeakyBucket(options)
        expect(bucket.remaining).to.equal(options.max)
        bucket.used = 1
        expect(bucket.remaining).to.equal(options.max - 1)
      })

      it('will return 0 if no remining', async () => {
        const options = {
          max: 10,
          refillInterval: 2002,
          refillAmount: 1,
        }
        const bucket = new LeakyBucket(options)
        bucket.used = 20
        expect(bucket.remaining).to.equal(0)
      })
    })

    describe('.acquire() method', () => {
      it('will put acquire in queue', async () => {
        const bucket = new LeakyBucket({
          max: 1,
          refillInterval: 1,
          refillAmount: 1,
        })
        sinon.stub(bucket, 'processQueue')

        const acquired = bucket.acquire()
        expect(await promiseState(acquired)).to.equal('pending')
        expect(bucket.queue.length).equal(1)
        bucket.queue.shift()?.()
        await (async () => {})()
        expect(await promiseState(acquired)).to.equal('fulfilled')
      })

      it('will put high priority acquire in front of queue', async () => {
        const bucket = new LeakyBucket({
          max: 1,
          refillInterval: 1,
          refillAmount: 1,
        })
        sinon.stub(bucket, 'processQueue')

        const dummyFunction = (): void => {}
        bucket.queue.push(dummyFunction)
        expect(bucket.queue[0]).equal(dummyFunction)

        bucket.acquire(true)
        expect(bucket.queue[1]).equal(dummyFunction)
      })

      it('will put acquire in queue', async () => {
        const bucket = new LeakyBucket({
          max: 1,
          refillInterval: 1,
          refillAmount: 1,
        })
        const processQueueStub = sinon.stub(bucket, 'processQueue')

        bucket.acquire()
        expect(processQueueStub.called).to.equal(true)
      })
    })
  })

  describe('.processQueue() method', async () => {
    it('will resolve queue', async () => {
      const bucket = new LeakyBucket({
        max: 2,
        refillInterval: 1,
        refillAmount: 2,
      })

      const processQueueStub = sinon.stub(bucket, 'processQueue')
      const acquired1 = bucket.acquire()
      const acquired2 = bucket.acquire()
      processQueueStub.restore()

      await bucket.processQueue()

      expect(await promiseState(acquired1)).to.equal('fulfilled')
      expect(await promiseState(acquired2)).to.equal('fulfilled')
      expect(bucket.used).equal(2)
    })

    it('will refill bucket', async () => {
      const bucket = new LeakyBucket({
        max: 2,
        refillInterval: 1,
        refillAmount: 2,
      })

      const processQueueStub = sinon.stub(bucket, 'processQueue')
      const acquired = bucket.acquire()
      processQueueStub.restore()

      await bucket.processQueue()

      expect(await promiseState(acquired)).to.equal('fulfilled')
      expect(bucket.remaining).equal(1)

      await clock.tickAsync(1)

      expect(bucket.remaining).equal(2)
    })
  })
})
