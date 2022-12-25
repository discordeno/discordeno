import type { Camelize, DiscordEmoji, DiscordGuild } from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { after, afterEach, before, beforeEach, describe, it } from 'mocha'
import { cached, rest } from './utils.js'
chai.use(chaiAsPromised)

let guild: Camelize<DiscordGuild>

before(async () => {
  if (!cached.guild) {
    guild = cached.guild = await rest.createGuild({
      name: 'Discordeno-test'
    })
  }
})

after(async () => {
  if (cached.guild) {
    await rest.deleteGuild(guild.id)
    cached.guild = undefined
  }
})

describe('Emoji helpers', () => {
  describe('Create and delete', () => {
    it('create an emoji', async () => {
      const emoji = await rest.createEmoji(guild.id, {
        name: 'blamewolf',
        image: 'https://cdn.discordapp.com/emojis/814955268123000832.png',
        roles: []
      })

      // Assertions
      expect(emoji.id).to.be.exist
      await rest.deleteEmoji(guild.id, emoji.id!)
    })

    // delete an emoji without a reason
    it('delete an emoji without a reason', async () => {
      const emoji = await rest.createEmoji(guild.id, {
        name: 'blamewolf',
        image: 'https://cdn.discordapp.com/emojis/814955268123000832.png',
        roles: []
      })

      // Assertions
      expect(emoji.id).to.be.exist

      await rest.deleteEmoji(guild.id, emoji.id!)

      await expect(rest.getEmoji(guild.id, emoji.id!)).to.eventually.rejected
    })

    // delete an emoji with a reason
    it('delete an emoji with a reason', async () => {
      const emoji = await rest.createEmoji(guild.id, {
        name: 'blamewolf',
        image: 'https://cdn.discordapp.com/emojis/814955268123000832.png',
        roles: []
      })

      // Assertions
      expect(emoji.id).to.be.exist

      await rest.deleteEmoji(guild.id, emoji.id!, 'with a reason')

      await expect(rest.getEmoji(guild.id, emoji.id!)).to.eventually.rejected
    })
  })

  describe('edit and get', () => {
    let emoji: Camelize<DiscordEmoji> & { id: string }

    beforeEach(async () => {
      emoji = (await rest.createEmoji(guild.id, {
        name: 'blamewolf',
        image: 'https://cdn.discordapp.com/emojis/814955268123000832.png',
        roles: []
      })) as Camelize<DiscordEmoji> & { id: string }
    })

    afterEach(async () => {
      await rest.deleteEmoji(guild.id, emoji.id)
    })

    // edit an emoji name
    it('Edit an emoji name', async () => {
      await rest.editEmoji(guild.id, emoji.id, {
        name: 'edited'
      })

      const edited = await rest.getEmoji(guild.id, emoji.id)

      expect(edited.name).to.equal('edited')
    })

    // edit an emoji roles
    it("Edit an emoji's roles", async () => {
      const role = await rest.createRole(guild.id, {
        name: 'dd-test-emoji'
      })
      await rest.editEmoji(guild.id, emoji.id, {
        roles: [role.id]
      })

      const edited = await rest.getEmoji(guild.id, emoji.id)

      expect(edited.roles?.length).to.equal(1)
    })

    // get an emoji
    it('get an emoji', async () => {
      const exists = await rest.getEmoji(guild.id, emoji.id)
      expect(exists.id).to.be.exist
      expect(emoji.id).to.equal(exists.id)
    })

    it('get all guild emojis', async () => {
      await rest.createEmoji(guild.id, {
        name: 'blamewolf2',
        image: 'https://cdn.discordapp.com/emojis/814955268123000832.png',
        roles: []
      })

      const exists = await rest.getEmojis(guild.id)
      expect(exists.size).to.greaterThan(1)
    })
  })
})
