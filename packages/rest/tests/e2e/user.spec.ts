import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { e2ecache, rest } from './utils.js'
chai.use(chaiAsPromised)

before(async () => {
  if (!e2ecache.guild) {
    e2ecache.guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
  }
})

after(async () => {
  if (e2ecache.guild.id && !e2ecache.deletedGuild) {
    await rest.deleteGuild(e2ecache.guild.id)
  }
})

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

        expect(keys.includes('public_flags')).to.be.false
        expect(keys.includes('publicFlags')).to.be.true
      })
    })
  })

  it('With an invalid user id', async () => {
    await expect(rest.getUser('123')).eventually.throws
  })
})
