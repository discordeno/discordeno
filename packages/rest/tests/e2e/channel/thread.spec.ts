import type {
  Camelize,
  DiscordChannel,
  DiscordGuild,
  DiscordMessage
} from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { after, afterEach, before, beforeEach, describe } from 'mocha'
import { cached, CACHED_COMMUNITY_GUILD_ID, rest } from '../utils.js'
chai.use(chaiAsPromised)

let guild: Camelize<DiscordGuild>

before(async () => {
  if (!cached.guild) {
    cached.guild = await rest.createGuild({
      name: 'Discordeno-test'
    })
  }
  guild = cached.guild
})

after(async () => {
  if (cached.guild) {
    await rest.deleteGuild(guild.id)
    cached.guild = undefined
  }
})

describe('Thread helpers', () => {
  let channel: Camelize<DiscordChannel>
  let message: Camelize<DiscordMessage>

  beforeEach(async () => {
    channel = await rest.createChannel(guild.id, { name: 'threads' })
    message = await rest.sendMessage(channel.id, { content: 'thread message' })
  })

  afterEach(async () => {
    await rest.deleteChannel(channel.id)
  })

  it('Start and delete a thread', async () => {
    const thread = await rest.startThreadWithMessage(channel.id, message.id, {
      reason: 'idk',
      rateLimitPerUser: 5,
      name: 'tread carefully',
      autoArchiveDuration: 60
    })

    expect(thread.id).to.exist

    const threadMessage = await rest.sendMessage(thread.id, {
      content: 'message in a bottle'
    })
    expect(threadMessage.id).to.exist

    await rest.deleteChannel(thread.id)
    await expect(rest.getChannel(thread.id!)).to.eventually.rejected
  })

  describe('Edit and get', () => {
    let thread: Camelize<DiscordChannel>

    beforeEach(async () => {
      thread = await rest.startThreadWithMessage(channel.id, message.id, {
        reason: 'idk',
        rateLimitPerUser: 5,
        name: 'tread carefully',
        autoArchiveDuration: 60
      })
    })
    it('Edit and archive a thread', async () => {
      const threadMessage = await rest.sendMessage(thread.id, {
        content: 'message in a bottle'
      })
      expect(threadMessage.id).to.exist

      const edited = await rest.editChannel(thread.id, {
        archived: true,
        name: 'new name',
        autoArchiveDuration: 1440,
        locked: !thread.threadMetadata?.locked,
        rateLimitPerUser: (thread.rateLimitPerUser ?? 0) + 1
      })
      expect(thread.threadMetadata?.archived).to.not.equal(
        edited.threadMetadata?.archived
      )
      expect(thread.name).to.not.equal(edited.name)
      expect(thread.rateLimitPerUser).to.not.equal(edited.rateLimitPerUser)
      expect(thread.threadMetadata?.autoArchiveDuration).to.not.equal(
        edited.threadMetadata?.autoArchiveDuration
      )
      expect(thread.threadMetadata?.locked).to.not.equal(
        edited.threadMetadata?.locked
      )
    })

    it('Get active threads', async () => {
      const threadMessage = await rest.sendMessage(thread.id, {
        content: 'message in a bottle'
      })
      expect(threadMessage.id).to.exist

      const activeThreads = await rest.getActiveThreads(
        CACHED_COMMUNITY_GUILD_ID
      )
      expect(Boolean(activeThreads.threads.size)).to.true
    })

    it('Get archived threads', async () => {
      const archived = await rest.getPublicArchivedThreads(channel.id)
      expect(archived.threads.size).to.equal(0)
      expect(archived.members.size).to.equal(0)

      const threadMessage = await rest.sendMessage(thread.id, {
        content: 'message in a bottle'
      })
      expect(threadMessage.id).to.exist

      const edited = await rest.editChannel(thread.id, {
        archived: true
      })
      expect(thread.threadMetadata?.archived).to.not.equal(
        edited.threadMetadata?.archived
      )

      const archivedNow = await rest.getPublicArchivedThreads(channel.id)
      expect(Boolean(archivedNow.threads.size)).to.true
      expect(Boolean(archivedNow.members.size)).to.true
    })

    it('join and leave a thread', async () => {
      it('leave a thread', async () => {
        await rest.leaveThread(thread.id)
      })

      it('join a thread', async () => {
        await rest.joinThread(thread.id)
      })
    })
  })
})
