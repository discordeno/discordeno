import { StickerFormatTypes } from '@discordeno/types'
import { use as chaiUse, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
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

// waiting for channel
describe('Sticker tests', async () => {
  it('Can get a sticker', async () => {
    const sticker = await rest.getSticker(749054660769218631n)
    expect(sticker.name).to.equal('Wave')
  })

  it('Create, edit, get, and delete guild sticker', async () => {
    const sticker = await rest.createGuildSticker(e2eCache.guild.id, {
      name: 'sticker name',
      description: 'sticker description',
      tags: 'sticker tags',
      file: {
        blob: await (await fetch('https://i.imgur.com/ejqd6Ro.png')).blob(),
        name: 'ddlogo.png',
      },
    })

    expect(sticker.name).to.equal('sticker name')
    expect(sticker.description).to.equal('sticker description')
    expect(sticker.tags).to.equal('sticker tags')

    const channel = await rest.createChannel(e2eCache.guild.id, {
      name: 'test',
    })
    const message = await rest.sendMessage(channel.id, {
      stickerIds: [sticker.id],
    })

    expect(message.stickerItems?.[0].formatType).to.equal(StickerFormatTypes.Png)
    expect(message.stickerItems?.[0].id).to.equal(sticker.id)
    expect(message.stickerItems?.[0].name).to.equal(sticker.name)

    const getSticker = await rest.getGuildSticker(e2eCache.guild.id, sticker.id)

    expect(getSticker.name).to.equal('sticker name')
    expect(getSticker.description).to.equal('sticker description')
    expect(getSticker.tags).to.equal('sticker tags')

    const editSticker = await rest.editGuildSticker(e2eCache.guild.id, sticker.id, {
      name: 'sticker name',
      description: 'sticker description',
      tags: 'sticker tags',
    })

    expect(editSticker.name).to.equal('sticker name')
    expect(editSticker.description).to.equal('sticker description')
    expect(editSticker.tags).to.equal('sticker tags')

    await rest.createGuildSticker(e2eCache.guild.id, {
      name: 'sticker 2',
      description: 'sticker 2',
      tags: 'sticker tags 2',
      file: {
        blob: await (await fetch('https://i.imgur.com/ejqd6Ro.png')).blob(),
        name: 'ddlogo.png',
      },
    })
    const stickers = await rest.getGuildStickers(e2eCache.guild.id)
    expect(stickers.length).to.greaterThan(1)

    await rest.deleteGuildSticker(e2eCache.guild.id, sticker.id)
    await expect(rest.getGuildSticker(e2eCache.guild.id, sticker.id)).to.eventually.rejected
  })
})
