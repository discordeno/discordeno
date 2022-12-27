import { expect } from 'chai'
import { describe, it } from 'mocha'
import { rest } from '../utils.js'

describe('[rest] manager', () => {
  describe('Get a user from the api', () => {
    it('With a valid user id', async () => {
      const user = await rest.getUser('130136895395987456')

      describe('User has correct shape and form', () => {
        it('Has correct id', () => {
          expect(user.id).to.be.equal('130136895395987456')
        })

        it('Has a valid username', () => {
          expect(user.username.length).to.be.greaterThanOrEqual(1)
        })

        it('Has a valid discriminator', () => {
          expect(user.discriminator.length).to.be.equal(4)
        })

        it('Has been camelized', () => {
          const keys = Object.keys(user)

          expect(keys.includes('mfa_enabled')).to.be.false
          expect(keys.includes('accent_color')).to.be.false
          expect(keys.includes('premium_type')).to.be.false
          expect(keys.includes('public_flags')).to.be.false
          expect(keys.includes('mfaEnabled')).to.be.true
          expect(keys.includes('accentColor')).to.be.true
          expect(keys.includes('premiumType')).to.be.true
          expect(keys.includes('publicFlags')).to.be.true
        })
      })
    })

    // TODO fix this test, needs proper error handling in rest
    // it('With an invalid user id', async () => {
    //   const user = await rest.getUser('123')
    //   console.log('user fail', user)
    //   expect(await rest.getUser('123')).to.throw
    // })
  })
})
