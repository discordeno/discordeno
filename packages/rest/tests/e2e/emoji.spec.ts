import type { Camelize, DiscordEmoji } from '@discordeno/types'
import { urlToBase64 } from '@discordeno/utils'
import { use as chaiUse, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { after, afterEach, before, beforeEach, describe, it } from 'mocha'
import { e2eCache, rest } from './utils.js'

chaiUse(chaiAsPromised)

before(async () => {
  if (!e2eCache.guild) {
    e2eCache.guild = await rest.createGuild({
      name: 'Discordeno-test',
    })
  }
})

after(async () => {
  if (e2eCache.guild.id && !e2eCache.deletedGuild) {
    e2eCache.deletedGuild = true
    await rest.deleteGuild(e2eCache.guild.id)
  }
})

describe('Create and delete emojis', () => {
  it('create an emoji', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })

    // Assertions
    expect(emoji.id).to.be.exist
    await rest.deleteEmoji(e2eCache.guild.id, emoji.id!)
  })

  // delete an emoji without a reason
  it('delete an emoji without a reason', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })

    // Assertions
    expect(emoji.id).to.be.exist

    await rest.deleteEmoji(e2eCache.guild.id, emoji.id!)

    await expect(rest.getEmoji(e2eCache.guild.id, emoji.id!)).to.eventually.rejected
  })

  // delete an emoji with a reason
  it('delete an emoji with a reason', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })

    // Assertions
    expect(emoji.id).to.be.exist

    await rest.deleteEmoji(e2eCache.guild.id, emoji.id!, 'with a reason')

    await expect(rest.getEmoji(e2eCache.guild.id, emoji.id!)).to.eventually.rejected
  })
})

describe('Edit and get emojis', () => {
  let emoji: Camelize<DiscordEmoji> & { id: string }

  beforeEach(async () => {
    emoji = (await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })) as Camelize<DiscordEmoji> & { id: string }
  })

  afterEach(async () => {
    await rest.deleteEmoji(e2eCache.guild.id, emoji.id)
  })

  // edit an emoji name
  it('Edit an emoji name', async () => {
    await rest.editEmoji(e2eCache.guild.id, emoji.id, {
      name: 'edited',
    })

    const edited = await rest.getEmoji(e2eCache.guild.id, emoji.id)

    expect(edited.name).to.equal('edited')
  })

  // edit an emoji roles
  it("Edit an emoji's roles", async () => {
    const role = await rest.createRole(e2eCache.guild.id, {
      name: 'dd-test-emoji',
    })
    await rest.editEmoji(e2eCache.guild.id, emoji.id, {
      roles: [role.id],
    })

    const edited = await rest.getEmoji(e2eCache.guild.id, emoji.id)

    expect(edited.roles?.length).to.equal(1)
  })

  // get an emoji
  it('get an emoji', async () => {
    const exists = await rest.getEmoji(e2eCache.guild.id, emoji.id)
    expect(exists.id).to.be.exist
    expect(emoji.id).to.equal(exists.id)
  })

  it('get all guild emojis', async () => {
    await rest.createEmoji(e2eCache.guild.id, {
      name: 'blamewolf2',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/814955268123000832.png'),
      roles: [],
    })

    const exists = await rest.getEmojis(e2eCache.guild.id)
    expect(exists.length).to.greaterThan(1)
  })
})
