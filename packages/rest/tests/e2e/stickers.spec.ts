import type { Camelize, DiscordSticker } from '@discordeno/types'
import { StickerFormatTypes } from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { afterEach, beforeEach, describe, it } from 'mocha'
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

// waiting for channel
describe('[stickers] Sticker helpers', async () => {
  it('Can get a sticker', async () => {
    const sticker = await rest.getSticker(749054660769218631n)
    expect(sticker.name).to.equal('Wave')
  })

  describe('Guild sticker helpers', () => {
    describe('Create and delete guild sticker helpers', () => {
      it('Can create a sticker', async () => {
        const sticker = await rest.createGuildSticker(e2ecache.guild.id, {
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

        const channel = await rest.createChannel(e2ecache.guild.id, {
          name: 'test',
        })
        const message = await rest.sendMessage(channel.id, {
          stickerIds: [sticker.id],
        })

        expect(message.stickerItems?.[0].formatType).to.equal(StickerFormatTypes.Png)
        expect(message.stickerItems?.[0].id).to.equal(sticker.id)
        expect(message.stickerItems?.[0].name).to.equal(sticker.name)

        await rest.deleteGuildSticker(e2ecache.guild.id, sticker.id)
        await rest.deleteChannel(channel.id)
      })

      it('Can delete a sticker', async () => {
        const sticker = await rest.createGuildSticker(e2ecache.guild.id, {
          name: 'sticker name',
          description: 'sticker description',
          tags: 'sticker tags',
          file: {
            blob: await (await fetch('https://i.imgur.com/ejqd6Ro.png')).blob(),
            name: 'ddlogo.png',
          },
        })
        await rest.deleteGuildSticker(e2ecache.guild.id, sticker.id)
        await expect(rest.getGuildSticker(e2ecache.guild.id, sticker.id)).to.eventually.rejected
      })
    })

    describe('Get and edit guild sticker helpers', () => {
      let sticker: Camelize<DiscordSticker>

      beforeEach(async () => {
        sticker = await rest.createGuildSticker(e2ecache.guild.id, {
          name: 'sticker name',
          description: 'sticker description',
          tags: 'sticker tags',
          file: {
            blob: await (await fetch('https://i.imgur.com/ejqd6Ro.png')).blob(),
            name: 'ddlogo.png',
          },
        })
      })

      afterEach(async () => {
        await rest.deleteGuildSticker(e2ecache.guild.id, sticker.id)
      })

      it('Can get a sticker', async () => {
        const getSticker = await rest.getGuildSticker(e2ecache.guild.id, sticker.id)

        expect(getSticker.name).to.equal('sticker name')
        expect(getSticker.description).to.equal('sticker description')
        expect(getSticker.tags).to.equal('sticker tags')
      })

      it('Can get stickers', async () => {
        const sticker2 = await rest.createGuildSticker(e2ecache.guild.id, {
          name: 'sticker 2',
          description: 'sticker 2',
          tags: 'sticker tags 2',
          file: {
            blob: await (await fetch('https://i.imgur.com/ejqd6Ro.png')).blob(),
            name: 'ddlogo.png',
          },
        })
        const stickers = await rest.getGuildStickers(e2ecache.guild.id)
        await rest.deleteGuildSticker(e2ecache.guild.id, sticker2.id)

        expect(stickers.length).to.greaterThan(1)
      })

      it('Can edit sticker', async () => {
        const editSticker = await rest.editGuildSticker(e2ecache.guild.id, sticker.id, {
          name: 'sticker name',
          description: 'sticker description',
          tags: 'sticker tags',
        })

        expect(editSticker.name).to.equal('sticker name')
        expect(editSticker.description).to.equal('sticker description')
        expect(editSticker.tags).to.equal('sticker tags')
      })
    })
  })
})
