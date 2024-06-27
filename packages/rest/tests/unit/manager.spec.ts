import { expect } from 'chai'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'
import { createRestManager } from '../../src/manager.js'
import type { RestManager } from '../../src/types.js'
import { fakeToken as token } from '../constants.js'

describe('[rest] manager', () => {
  describe('create a rest manager with only a token', () => {
    const rest = createRestManager({ token })
    it('Token is set properly.', () => {
      expect(rest.token).to.be.equal(token)
    })

    it('Default values are set when none are provided.', () => {
      expect(rest.version).to.be.equal(10)
      expect(rest.baseUrl).to.be.equal('https://discord.com/api')
    })
  })

  describe('create a manager with other options', () => {
    const options = {
      token,
      version: 9,
      proxy: {
        baseUrl: 'https://localhost:8000',
        authorization: token,
      },
    } as const

    const rest = createRestManager(options)

    it('With a version', () => {
      expect(rest.version).to.be.equal(options.version)
    })

    it('With a base url', () => {
      expect(rest.baseUrl).to.be.equal(options.proxy.baseUrl)
    })

    it('With an application id', () => {
      const subrest = createRestManager({ ...options, applicationId: '130136895395987456' })
      expect(subrest.applicationId).to.be.equal(130136895395987456n)
    })
  })

  describe('rest.simplifyUrl', () => {
    describe('the ending id', () => {
      it('Will change to x for channel, guild, message, messages', () => {
        const rest = createRestManager({ token })
        expect(rest.simplifyUrl('/messages/555555555555555555', 'PUT')).to.be.equal('/messages/x')
        expect(rest.simplifyUrl('/users/555555555555555555', 'PUT')).to.be.equal('/users/x')
        expect(rest.simplifyUrl('/webhooks/555555555555555555', 'PUT')).to.be.equal('/webhooks/x')
        expect(rest.simplifyUrl('/channel/555555555555555555', 'PUT')).to.be.equal('/channel/x')
        expect(rest.simplifyUrl('/guild/555555555555555555', 'PUT')).to.be.equal('/guild/x')
      })

      it('Will not change to x for channels, guilds', () => {
        const rest = createRestManager({ token })
        expect(rest.simplifyUrl('/channels/555555555555555555', 'PUT')).to.be.equal('/channels/555555555555555555')
        expect(rest.simplifyUrl('/guilds/555555555555555555', 'PUT')).to.be.equal('/guilds/555555555555555555')
      })
    })

    describe('with route', () => {
      describe('/reactions', () => {
        it('Will remove path after reactions', () => {
          const rest = createRestManager({ token })
          expect(rest.simplifyUrl('/channels/555555555555555555/reactions/555555555555555555/wdiubaibfwuabfobaowbfoibnion', 'PUT')).to.be.equal(
            '/channels/555555555555555555/reactions',
          )
        })
      })

      describe('/messages', () => {
        it('Will add method in front route if method is DELETE', () => {
          const rest = createRestManager({ token })
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'DELETE')).to.be.equal(
            'D/channels/555555555555555555/messages/x',
          )
        })

        it('Will not add method in front route', () => {
          const rest = createRestManager({ token })
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'POST')).to.be.equal(
            '/channels/555555555555555555/messages/x',
          )
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'GET')).to.be.equal(
            '/channels/555555555555555555/messages/x',
          )
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'PUT')).to.be.equal(
            '/channels/555555555555555555/messages/x',
          )
        })
      })
    })
  })

  describe('rest.checkRateLimits', () => {
    let rest: RestManager
    let clock: sinon.SinonFakeTimers

    beforeEach(() => {
      rest = createRestManager({ token })
      clock = sinon.useFakeTimers()
    })

    afterEach(() => {
      clock.restore()
    })

    it('will return false for path without rate limited', () => {
      expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false)
    })

    describe('With per URL rateLimitedPath', () => {
      it('Will return time until reset if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 6541,
        })
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(6541)
      })

      it('Will return false if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now(),
        })
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false)
      })
    })

    describe('With global rateLimitedPath', () => {
      it('Will return time until reset if before resetTimestamp', () => {
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 9849,
        })
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(9849)
      })

      it('Will return false if before resetTimestamp', () => {
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now(),
        })
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(false)
      })
    })

    describe('With both URL and Global rateLimitedPath', () => {
      it('Will return URL time first if before resetTimestamp', () => {
        rest.rateLimitedPaths.set(`Bot ${token}/channel/555555555555555555`, {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 6541,
        })
        rest.rateLimitedPaths.set('global', {
          url: '/channel/555555555555555555',
          resetTimestamp: Date.now() + 9849,
        })
        expect(rest.checkRateLimits('/channel/555555555555555555', `Bot ${token}`)).to.be.equal(6541)
      })
    })
  })

  describe('rest.processRateLimitedPaths', () => {
    let rest: RestManager
    let time: sinon.SinonFakeTimers

    beforeEach(() => {
      rest = createRestManager({ token: '1', applicationId: 1n })
      time = sinon.useFakeTimers()
    })

    afterEach(() => {
      time.restore()
    })

    describe('rateLimitedPaths', () => {
      it('Will not delete path from rateLimitedPaths before resetTimestamp', () => {
        rest.rateLimitedPaths.set('', {
          resetTimestamp: Date.now() + 1,
          url: '',
        })
        rest.processRateLimitedPaths()
        expect(rest.rateLimitedPaths.size).to.be.equal(1)
      })

      it('Will delete path from rateLimitedPaths after resetTimestamp', () => {
        rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' })
        rest.processRateLimitedPaths()
        expect(rest.rateLimitedPaths.size).to.be.equal(0)
      })

      it('Will mark globallyRateLimited false if key is global', () => {
        rest.rateLimitedPaths.set('global', {
          resetTimestamp: Date.now(),
          url: '',
        })
        rest.globallyRateLimited = true
        rest.processRateLimitedPaths()
        expect(rest.rateLimitedPaths.size).to.be.equal(0)
        expect(rest.globallyRateLimited).to.be.equal(false)
      })

      it('Will not mark globallyRateLimited false if key is not global', () => {
        rest.rateLimitedPaths.set('', { resetTimestamp: Date.now(), url: '' })
        rest.globallyRateLimited = true
        rest.processRateLimitedPaths()
        expect(rest.rateLimitedPaths.size).to.be.equal(0)
        expect(rest.globallyRateLimited).to.be.equal(true)
      })
    })
  })
})
