import { expect } from 'chai'
import { describe, it } from 'mocha'
import { createRestManager } from '../../src/index.js'
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
      baseUrl: 'https://localhost:8000',
    } as const

    const rest = createRestManager(options)

    it('With a version', () => {
      expect(rest.version).to.be.equal(options.version)
    })

    it('With a base url', () => {
      expect(rest.baseUrl).to.be.equal(options.baseUrl)
    })
  })

  describe('rest.simplifyUrl', () => {
    const rest = createRestManager({ token })
    describe('the ending id', () => {
      it('Will change to x for channel, guild, message, messages', () => {
        expect(rest.simplifyUrl('/messages/555555555555555555', 'PUT')).to.be.equal('/messages/x')
        expect(rest.simplifyUrl('/users/555555555555555555', 'PUT')).to.be.equal('/users/x')
        expect(rest.simplifyUrl('/webhooks/555555555555555555', 'PUT')).to.be.equal('/webhooks/x')
        expect(rest.simplifyUrl('/channel/555555555555555555', 'PUT')).to.be.equal('/channel/x')
        expect(rest.simplifyUrl('/guild/555555555555555555', 'PUT')).to.be.equal('/guild/x')
      })

      it('Will not change to x for channels, guilds', () => {
        expect(rest.simplifyUrl('/channels/555555555555555555', 'PUT')).to.be.equal('/channels/555555555555555555')
        expect(rest.simplifyUrl('/guilds/555555555555555555', 'PUT')).to.be.equal('/guilds/555555555555555555')
      })
    })

    describe('with route', () => {
      describe('/reactions', () => {
        it('Will remove path after reactions', () => {
          expect(rest.simplifyUrl('/channels/555555555555555555/reactions/555555555555555555/wdiubaibfwuabfobaowbfoibnion', 'PUT')).to.be.equal(
            '/channels/555555555555555555/reactions',
          )
        })
      })

      describe('/messages', () => {
        it('Will add method in front route if method is DELETE', () => {
          expect(rest.simplifyUrl('/channels/555555555555555555/messages/555555555555555555', 'DELETE')).to.be.equal(
            'DELETE/channels/555555555555555555/messages/x',
          )
        })

        it('Will not add method in front route', () => {
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
})
