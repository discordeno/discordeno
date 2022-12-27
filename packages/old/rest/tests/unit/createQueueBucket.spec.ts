import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import type { QueueBucket } from '../../src/createQueueBucket.js'
import { createQueueBucket } from '../../src/createQueueBucket.js'
import type { RestManager } from '../../src/restManager.js'
import { createRestManager } from '../../src/restManager.js'

describe('QueueBucket', () => {
  let queueBucket: QueueBucket
  let rest: RestManager
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    rest = createRestManager({ token: ' ' })
    queueBucket = createQueueBucket(rest, {})
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.restore()
    clock.restore()
  })

  describe('isRequestAllowed()', () => {
    it('will return true if remaining > 0', () => {
      queueBucket.remaining = 1
      expect(queueBucket.isRequestAllowed()).to.be.true
    })

    it('will return false if remaining <= 0', () => {
      queueBucket.remaining = 0
      expect(queueBucket.isRequestAllowed()).to.be.false
    })
  })

  describe('processWaiting()', async () => {
    it('run function in waiting array if isRequestAllowed() is true', async () => {
      const resolve1 = sinon.spy()
      const resolve2 = sinon.spy()
      queueBucket.waiting.push(resolve1, resolve2)

      sinon.stub(queueBucket, 'isRequestAllowed').returns(true)

      queueBucket.processWaiting()
      expect(resolve1.called).to.be.true
      expect(resolve2.called).to.be.true
    })

    it("don't run function in waiting array if isRequestAllowed() is false", async () => {
      const resolve = sinon.spy()
      queueBucket.waiting.push(resolve)

      sinon.stub(queueBucket, 'isRequestAllowed').returns(false)

      queueBucket.processWaiting()
      expect(resolve.called).to.be.false
    })

    it('wait 1s and call isRequestAllowed() again', async () => {
      queueBucket.waiting.push(() => {})
      const isRequestAllowedStub = sinon
        .stub(queueBucket, 'isRequestAllowed')
        .returns(false)

      queueBucket.processWaiting()
      expect(isRequestAllowedStub.calledOnce).to.be.true
      await clock.tickAsync(999)
      expect(isRequestAllowedStub.calledTwice).to.be.false
      await clock.tickAsync(1)
      expect(isRequestAllowedStub.calledTwice).to.be.true
    })
  })
})
