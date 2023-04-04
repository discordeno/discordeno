import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { LeakyBucket } from '../src/bucket.js'

async function promiseState(p: Promise<any>): Promise<string> {
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
      const bucket = new LeakyBucket()
      expect(bucket.max).equals(1)
      expect(bucket.refillInterval).equals(5000)
      expect(bucket.refillAmount).equals(1)
      expect(bucket.queue).to.deep.equal([])
    })

    it('will acquire a request', async () => {
      const bucket = new LeakyBucket({
        max: 120,
        refillInterval: 60000,
        refillAmount: 120,
      })

      await bucket.acquire()
      expect(bucket.remaining).to.be.equal(119)
      expect(bucket.used).to.be.equal(1)
    })

    it('will handle multiple requests at once', async () => {
      const bucket = new LeakyBucket({
        max: 120,
        refillInterval: 60000,
        refillAmount: 120,
      })

      for (let i = 0; i < 10; i++) {
        bucket.acquire()
      }
    })

    it('will handle too many requests', async () => {
      const bucket = new LeakyBucket({
        max: 5,
        refillInterval: 10000,
        refillAmount: 5,
      })

      for (let i = 0; i < 10; i++) {
        bucket.acquire()
      }
    })

    it('bucket refills are done properly', async () => {
      const bucket = new LeakyBucket({
        max: 2,
        refillInterval: 500,
        refillAmount: 2,
      })

      await bucket.acquire()
      expect(bucket.remaining).equals(1)
      expect(bucket.used).equals(1)
      await clock.tickAsync(1000)
      expect(bucket.remaining).equals(2)
      expect(bucket.used).equals(0)

      await bucket.acquire()
      await clock.tickAsync(1000)
    })

    it('bucket refills when refill amount is < max', async () => {
      const bucket = new LeakyBucket({
        max: 3,
        refillInterval: 800,
        refillAmount: 1,
      })

      await bucket.acquire()
      await bucket.acquire()
      expect(bucket.remaining).equals(1)
      expect(bucket.used).equals(2)
      await clock.tickAsync(1000)
      expect(bucket.remaining).equals(2)
      expect(bucket.used).equals(1)

      await clock.tickAsync(2000)
      expect(bucket.remaining).equals(3)
      expect(bucket.used).equals(0)
    })

    it('bucket refills when refill interval is slow', async () => {
      const bucket = new LeakyBucket({
        max: 1,
        refillInterval: 500,
        refillAmount: 1,
      })

      const acquired1 = bucket.acquire()
      const acquired2 = bucket.acquire()

      // js event loop
      await (async () => {})()

      expect(await promiseState(acquired1)).to.equal('fulfilled')
      expect(await promiseState(acquired2)).to.equal('pending')

      await clock.tickAsync(499)
      expect(await promiseState(acquired2)).to.equal('pending')

      await clock.tickAsync(1)
      expect(await promiseState(acquired2)).to.equal('fulfilled')

      expect(bucket.remaining).equals(0)
      expect(bucket.used).equals(1)
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
