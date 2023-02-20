import type { Camelize, DiscordEmoji } from '@discordeno/types'
import { urlToBase64 } from '@discordeno/utils'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { after, afterEach, before, beforeEach, describe, it } from 'mocha'
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
  if (rest.invalidBucket.timeoutId) clearTimeout(rest.invalidBucket.timeoutId)
  if (e2ecache.guild.id && !e2ecache.deletedGuild) {
    e2ecache.deletedGuild = true
    await rest.deleteGuild(e2ecache.guild.id)
  }
})

describe('Emoji helpers', () => {
  describe('Create and delete', () => {
    it('create an emoji', async () => {
      const emoji = await rest.createEmoji(e2ecache.guild.id, {
        name: 'blamewolf',
        image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
        roles: [],
      })

      // Assertions
      expect(emoji.id).to.be.exist
      await rest.deleteEmoji(e2ecache.guild.id, emoji.id!)
    })

    // delete an emoji without a reason
    it('delete an emoji without a reason', async () => {
      const emoji = await rest.createEmoji(e2ecache.guild.id, {
        name: 'blamewolf',
        image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
        roles: [],
      })

      // Assertions
      expect(emoji.id).to.be.exist

      await rest.deleteEmoji(e2ecache.guild.id, emoji.id!)

      await expect(rest.getEmoji(e2ecache.guild.id, emoji.id!)).to.eventually.rejected
    })

    // delete an emoji with a reason
    it('delete an emoji with a reason', async () => {
      const emoji = await rest.createEmoji(e2ecache.guild.id, {
        name: 'blamewolf',
        image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
        roles: [],
      })

      // Assertions
      expect(emoji.id).to.be.exist

      await rest.deleteEmoji(e2ecache.guild.id, emoji.id!, 'with a reason')

      await expect(rest.getEmoji(e2ecache.guild.id, emoji.id!)).to.eventually.rejected
    })
  })

  describe('edit and get', () => {
    let emoji: Camelize<DiscordEmoji> & { id: string }

    beforeEach(async () => {
      emoji = (await rest.createEmoji(e2ecache.guild.id, {
        name: 'blamewolf',
        image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
        roles: [],
      })) as Camelize<DiscordEmoji> & { id: string }
    })

    afterEach(async () => {
      await rest.deleteEmoji(e2ecache.guild.id, emoji.id)
    })

    // edit an emoji name
    it('Edit an emoji name', async () => {
      await rest.editEmoji(e2ecache.guild.id, emoji.id, {
        name: 'edited',
      })

      const edited = await rest.getEmoji(e2ecache.guild.id, emoji.id)

      expect(edited.name).to.equal('edited')
    })

    // edit an emoji roles
    it("Edit an emoji's roles", async () => {
      const role = await rest.createRole(e2ecache.guild.id, {
        name: 'dd-test-emoji',
      })
      await rest.editEmoji(e2ecache.guild.id, emoji.id, {
        roles: [role.id],
      })

      const edited = await rest.getEmoji(e2ecache.guild.id, emoji.id)

      expect(edited.roles?.length).to.equal(1)
    })

    // get an emoji
    it('get an emoji', async () => {
      const exists = await rest.getEmoji(e2ecache.guild.id, emoji.id)
      expect(exists.id).to.be.exist
      expect(emoji.id).to.equal(exists.id)
    })

    it('get all guild emojis', async () => {
      await rest.createEmoji(e2ecache.guild.id, {
        name: 'blamewolf2',
        image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
        roles: [],
      })

      const exists = await rest.getEmojis(e2ecache.guild.id)
      expect(exists.length).to.greaterThan(1)
    })
  })
})
