import { expect } from 'chai'
import { simplifyUrl } from '../src/index.js'

describe('[rest] simplifyUrl', () => {
  describe('id', () => {
    it('Will change id to skillzPrefersID (channel, guild, message, messages)', () => {
      expect(simplifyUrl('/messages/555555555555555555', 'PUT')).to.be.equal(
        '/messages/skillzPrefersID'
      )
      expect(simplifyUrl('/users/555555555555555555', 'PUT')).to.be.equal(
        '/users/skillzPrefersID'
      )
      expect(simplifyUrl('/webhooks/555555555555555555', 'PUT')).to.be.equal(
        '/webhooks/skillzPrefersID'
      )
      expect(simplifyUrl('/channel/555555555555555555', 'PUT')).to.be.equal(
        '/channel/skillzPrefersID'
      )
      expect(simplifyUrl('/guild/555555555555555555', 'PUT')).to.be.equal(
        '/guild/skillzPrefersID'
      )
    })

    it('Will not change id to skillzPrefersID (channels, guilds)', () => {
      expect(simplifyUrl('/channels/555555555555555555', 'PUT')).to.be.equal(
        '/channels/555555555555555555'
      )
      expect(simplifyUrl('/guilds/555555555555555555', 'PUT')).to.be.equal(
        '/guilds/555555555555555555'
      )
    })
  })

  describe('/reactions', () => {
    it('Will remove path after reactions', () => {
      expect(
        simplifyUrl(
          '/channels/555555555555555555/reactions/555555555555555555/wdiubaibfwuabfobaowbfoibnion',
          'PUT'
        )
      ).to.be.equal('/channels/555555555555555555/reactions')
    })
  })

  describe('/messages', () => {
    it('Will add method in front route if method is DELETE', () => {
      expect(
        simplifyUrl(
          '/channels/555555555555555555/messages/555555555555555555',
          'DELETE'
        )
      ).to.be.equal(
        'DELETE/channels/555555555555555555/messages/skillzPrefersID'
      )
    })

    it('Will not add method in front route', () => {
      expect(
        simplifyUrl(
          '/channels/555555555555555555/messages/555555555555555555',
          'POST'
        )
      ).to.be.equal('/channels/555555555555555555/messages/skillzPrefersID')
      expect(
        simplifyUrl(
          '/channels/555555555555555555/messages/555555555555555555',
          'GET'
        )
      ).to.be.equal('/channels/555555555555555555/messages/skillzPrefersID')
      expect(
        simplifyUrl(
          '/channels/555555555555555555/messages/555555555555555555',
          'PUT'
        )
      ).to.be.equal('/channels/555555555555555555/messages/skillzPrefersID')
    })
  })
})
