import { processReactionString, urlToBase64 } from '@discordeno/utils'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { e2eCache, rest } from './utils.js'

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

describe('Send a message', () => {
  it('With content', async () => {
    const message = await rest.sendMessage(e2eCache.channel.id, { content: 'testing rate limit manager' })
    expect(message.content).to.be.equal('testing rate limit manager')

    const edited = await rest.editMessage(message.channelId, message.id, { content: 'testing rate limit manager edited' })
    expect(message.content).to.be.not.equal(edited.content)

    await rest.deleteMessage(message.channelId, message.id)
  })

  it('With an image', async () => {
    const image = await fetch('https://cdn.discordapp.com/avatars/270010330782892032/d031ea881688526d1ae235fd2843e53c.jpg?size=2048')
      .then(async (res) => await res.blob())
      .catch(() => undefined)
    expect(image).to.not.be.undefined
    if (!image) throw new Error('Was not able to fetch the image.')

    const message = await rest.sendMessage(e2eCache.channel.id, { files: [{ blob: image, name: 'gamer' }] })
    expect(message.attachments.length).to.be.greaterThan(0)
    const [attachment] = message.attachments

    expect(attachment.filename).to.be.equal('gamer')
  })

  it('With a file attachment', async () => {
    const txtFile = new Blob(['hello world'], { type: 'text/plain' })

    const fileMsg = await rest.sendMessage(e2eCache.channel.id, {
      content: '222',
      files: [
        {
          name: 'application.txt',
          blob: txtFile,
        },
      ],
    })

    expect(fileMsg.id).not.equals(undefined)
    expect(fileMsg.content).equals('222')
    expect(fileMsg.attachments.length).equals(1)
    expect(fileMsg.attachments.at(0)?.filename).equals('application.txt')
    expect(fileMsg.attachments.at(0)?.size).equals(11)

    const txtFile2 = new Blob(['hello world edit'], { type: 'text/plain' })

    const edited = await rest.editMessage(e2eCache.channel.id, fileMsg.id, {
      content: '222 edit',
      files: [
        {
          name: 'application_edit.txt',
          blob: txtFile2,
        },
      ],
    })

    expect(edited.id).not.equals(undefined)
    expect(edited.content).equals('222 edit')
    expect(edited.attachments.length).equals(1)
    expect(edited.attachments.at(0)?.filename).equals('application_edit.txt')
    expect(edited.attachments.at(0)?.size).equals(16)
  })
})

describe('Manage reactions', async () => {
  it('Add and delete a unicode reaction', async () => {
    const reactionChannel = await rest.createChannel(e2eCache.guild.id, { name: 'reactions' })
    const message = await rest.sendMessage(reactionChannel.id, { content: 'add reaction test' })

    await rest.addReaction(message.channelId, message.id, '📙')
    const reacted = await rest.getMessage(message.channelId, message.id)
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1)

    await rest.deleteOwnReaction(message.channelId, message.id, '📙')
    const unreacted = await rest.getMessage(message.channelId, message.id)
    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.be.equal(false)
  })

  it('Add and delete a custom reaction', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
    })
    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`

    const reactionChannel = await rest.createChannel(e2eCache.guild.id, { name: 'reactions' })
    const message = await rest.sendMessage(reactionChannel.id, { content: 'add reaction test' })

    await rest.addReaction(message.channelId, message.id, emojiCode)
    const reacted = await rest.getMessage(message.channelId, message.id)
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1)

    const reactions = await rest.getReactions(reactionChannel.id, message.id, processReactionString(emojiCode))
    expect(reactions?.length).to.be.greaterThanOrEqual(1)

    await rest.deleteOwnReaction(message.channelId, message.id, emojiCode)
    const unreacted = await rest.getMessage(message.channelId, message.id)
    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.be.equal(false)
  })

  it('Add several reactions with random order and delete all of them', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
    })
    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`

    const reactionChannel = await rest.createChannel(e2eCache.guild.id, { name: 'reactions' })
    const message = await rest.sendMessage(reactionChannel.id, { content: 'add reaction test' })

    await rest.addReactions(message.channelId, message.id, [emojiCode, '📙'])
    const reacted = await rest.getMessage(message.channelId, message.id)
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1)

    await rest.deleteReactionsAll(message.channelId, message.id)
    const unreacted = await rest.getMessage(message.channelId, message.id)
    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!unreacted.reactions?.length).to.equal(false)
  })

  it('Add several reactions in an order and delete emoji reaction', async () => {
    const emoji = await rest.createEmoji(e2eCache.guild.id, {
      name: 'discordeno',
      image: await urlToBase64('https://cdn.discordapp.com/emojis/785403373817823272.webp?size=96'),
    })
    const emojiCode = `<:${emoji.name!}:${emoji.id!}>`

    const reactionChannel = await rest.createChannel(e2eCache.guild.id, { name: 'reactions' })
    const message = await rest.sendMessage(reactionChannel.id, { content: 'add reaction test' })

    await rest.addReactions(message.channelId, message.id, [emojiCode, '📙'], true)
    const reacted = await rest.getMessage(message.channelId, message.id)
    expect(reacted.reactions?.length).to.be.greaterThanOrEqual(1)

    await rest.deleteReactionsEmoji(message.channelId, message.id, emojiCode)
    const unreacted = await rest.getMessage(message.channelId, message.id)
    expect(unreacted.reactions?.length).to.greaterThanOrEqual(1)

    await rest.deleteUserReaction(message.channelId, message.id, rest.applicationId.toString(), '📙')
    const noreacted = await rest.getMessage(message.channelId, message.id)
    // Use boolean comparison because when its 0 length discord sends undefined
    expect(!!noreacted.reactions?.length).to.equal(false)
  })
})

describe('Manage pins', () => {
  it('Pin, get, and unpin messages', async () => {
    const channel = await rest.createChannel(e2eCache.guild.id, { name: 'pinning' })
    const message = await rest.sendMessage(channel.id, { content: 'pin me' })
    const message2 = await rest.sendMessage(channel.id, { content: 'pin me 2' })

    await rest.pinMessage(channel.id, message.id)
    await rest.pinMessage(channel.id, message2.id, 'with a reason')

    const pins = await rest.getPinnedMessages(channel.id)
    expect(pins.length).to.equal(2)
    expect(pins.some((p) => p.id === message.id)).to.equal(true)

    await rest.unpinMessage(channel.id, message.id)
    await rest.unpinMessage(channel.id, message2.id, 'with a reason')

    const unpinned = await rest.getPinnedMessages(channel.id)
    expect(unpinned.length).to.equal(0)
  })
})

describe('Rate limit manager testing', () => {
  it('Send 10 messages to 1 channel', async () => {
    const channel = await rest.createChannel(e2eCache.guild.id, { name: 'rate-limit-1' })
    await Promise.all(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (i) => {
        await rest.sendMessage(channel.id, { content: `10 messages to 1 channel testing rate limit manager ${i}` })
      }),
    )
  })

  it('Send 10 messages to 10 channels', async () => {
    await Promise.all(
      [...Array(10).keys()].map(async () => {
        const channel = await rest.createChannel(e2eCache.guild.id, { name: 'rate-limit-x' })

        await Promise.all(
          [...Array(10).keys()].map(async (_, index) => {
            await rest.sendMessage(channel.id, { content: `testing rate limit manager ${index}` })
          }),
        )
      }),
    )
  })
})
