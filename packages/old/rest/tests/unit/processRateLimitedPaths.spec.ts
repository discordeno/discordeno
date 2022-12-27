import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon, { spy } from 'sinon'
import type { RestManager } from '../../src/index.js'
import { createRestManager } from '../../src/index.js'

describe('[rest] processRateLimitedPaths', () => {
  let rest: RestManager
  let time: sinon.SinonFakeTimers

  beforeEach(() => {
    rest = createRestManager({ token: ' ' })
    time = sinon.useFakeTimers()
  })

  afterEach(() => {
    time.restore()
  })

  describe('rateLimitedPaths', () => {
    it('Will not delete path from rateLimitedPaths before resetTimestamp', () => {
      rest.rateLimitedPaths.set('', {
        resetTimestamp: Date.now() + 1,
        url: ''
      })
      rest.processRateLimitedPaths(rest)
      expect(rest.rateLimitedPaths.size).to.be.equal(1)
    })

    it('Will delete path from rateLimitedPaths after resetTimestamp', () => {
      rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' })
      rest.processRateLimitedPaths(rest)
      expect(rest.rateLimitedPaths.size).to.be.equal(0)
    })

    it('Will mark globallyRateLimited false if key is global', () => {
      rest.rateLimitedPaths.set('global', {
        resetTimestamp: Date.now(),
        url: ''
      })
      rest.globallyRateLimited = true
      rest.processRateLimitedPaths(rest)
      expect(rest.rateLimitedPaths.size).to.be.equal(0)
      expect(rest.globallyRateLimited).to.be.equal(false)
    })

    it('Will not mark globallyRateLimited false if key is not global', () => {
      rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' })
      rest.globallyRateLimited = true
      rest.processRateLimitedPaths(rest)
      expect(rest.rateLimitedPaths.size).to.be.equal(0)
      expect(rest.globallyRateLimited).to.be.equal(true)
    })
  })

  describe('processingRateLimitedPaths', () => {
    it('Will set processing true if queues is not empty', () => {
      rest.processingRateLimitedPaths = true
      rest.rateLimitedPaths.set('', {
        resetTimestamp: Date.now() + 1,
        url: ''
      })
      rest.processRateLimitedPaths(rest)
      expect(rest.processingRateLimitedPaths).to.be.equal(true)
    })

    it('Will set processing false if queues is empty', () => {
      rest.processingRateLimitedPaths = true
      rest.processRateLimitedPaths(rest)
      expect(rest.processingRateLimitedPaths).to.be.equal(false)
    })

    it('Will set timeout if queues is empty', () => {
      rest.rateLimitedPaths.set('', {
        resetTimestamp: Date.now() + 1,
        url: ''
      })
      const processRateLimitedPathsSpy = spy(rest, 'processRateLimitedPaths')
      rest.processRateLimitedPaths(rest)

      // Rerun after 1000ms
      time.tick(999)
      expect(processRateLimitedPathsSpy.callCount).to.be.equal(1)
      time.tick(1)
      expect(processRateLimitedPathsSpy.callCount).to.be.equal(2)
    })
  })
})
