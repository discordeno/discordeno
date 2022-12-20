import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import type { RestManager } from '../../src/index.js'
import { checkRateLimits, createRestManager } from '../../src/index.js'

describe('[rest] checkRateLimits', () => {
  let rest: RestManager
  let clock: sinon.SinonFakeTimers

  beforeEach(() => {
    rest = createRestManager({ token: ' ' })
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('Without rateLimitedPath', () => {
    expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
      false
    )
  })

  describe('With Per URL rateLimitedPath', () => {
    it('Will return time until reset if before resetTimestamp', () => {
      rest.rateLimitedPaths.set('/channel/555555555555555555', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now() + 6541
      })
      expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
        6541
      )
    })

    it('Will return false if before resetTimestamp', () => {
      rest.rateLimitedPaths.set('/channel/555555555555555555', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now()
      })
      expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
        false
      )
    })
  })

  describe('With Global rateLimitedPath', () => {
    it('Will return time until reset if before resetTimestamp', () => {
      rest.rateLimitedPaths.set('global', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now() + 9849
      })
      expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
        9849
      )
    })

    it('Will return false if before resetTimestamp', () => {
      rest.rateLimitedPaths.set('global', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now()
      })
      expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
        false
      )
    })
  })

  describe('With both URL and Global rateLimitedPath', () => {
    it('Will return URL time first if before resetTimestamp', () => {
      rest.rateLimitedPaths.set('/channel/555555555555555555', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now() + 6541
      })
      rest.rateLimitedPaths.set('global', {
        url: '/channel/555555555555555555',
        resetTimestamp: Date.now() + 9849
      })
      expect(checkRateLimits(rest, '/channel/555555555555555555')).to.be.equal(
        6541
      )
    })
  })
})
