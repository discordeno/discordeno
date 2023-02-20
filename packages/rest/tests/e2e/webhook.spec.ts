import type { Camelize, DiscordMessage } from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { beforeEach, describe, it } from 'mocha'
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
describe('[webhooks] Webhook helpers', async () => {
  const channel = await rest.createChannel(e2ecache.guild.id, {
    name: 'wbhook',
  })

  const webhook = await rest.createWebhook(channel.id, {
    name: 'idk',
  })

  describe('General webhook helpers', () => {
    it('Can create a webhook', async () => {
      expect(webhook).to.exist
      expect(webhook.name).to.equal('idk')
    })

    it('Can delete a webhook', async () => {
      const hookToDelete = await rest.createWebhook(channel.id, {
        name: 'delme',
      })
      await rest.deleteWebhook(hookToDelete.id)

      // Fetch the webhook to validate it was deleted
      await expect(rest.getWebhook(hookToDelete.id)).to.eventually.rejected
    })

    it('Can delete a webhook with token', async () => {
      const hookToDelete = await rest.createWebhook(channel.id, {
        name: 'delme',
      })
      expect(hookToDelete?.id).to.exist
      expect(hookToDelete.token).to.exist

      await rest.deleteWebhookWithToken(hookToDelete.id, hookToDelete.token!)

      // Fetch the webhook to validate it was deleted
      await expect(rest.getWebhook(hookToDelete.id)).to.eventually.rejected
    })
  })

  describe('Guild webhook helpers', async () => {
    it('Can edit a guild webhook', async () => {
      const edited = await rest.editWebhook(webhook.id, {
        name: 'edited',
      })

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('Can edit a guild webhook with token', async () => {
      const edited = await rest.editWebhookWithToken(webhook.id, webhook.token!, {
        name: 'editedtoken',
      })

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('Can get a guild webhook', async () => {
      const fetched = await rest.getWebhook(webhook.id)
      expect(fetched).to.exist
      expect(webhook.id).to.equal(fetched.id)
    })

    it('Can get a guild webhook with a token', async () => {
      expect(webhook.token).to.exist
      const fetched = await rest.getWebhookWithToken(webhook.id, webhook.token!)
      expect(webhook.id).to.equal(fetched.id)
    })
  })

  describe('Guild channel webhook helpers', async () => {
    // console.log('in guild channel webhook helper', 1)
    await rest.createWebhook(channel.id, {
      name: 'idkk',
    })
    // console.log('in guild channel webhook helper', 2)

    it('Can create guild channel webhooks', async () => {
      // console.log('in guild channel webhook helper', 3)
      // console.log('in guild channel webhook helper', 4)
      const fetched = await rest.getChannelWebhooks(channel.id)
      // console.log('in guild channel webhook helper', 1)
      expect(fetched.length).to.greaterThan(1)
      // console.log('in guild channel webhook helper', 6)
    })

    // console.log('in guild channel webhook helper', 7)
    it('Can get a guild channel webhooks', async () => {
      // console.log('in guild channel webhook helper', 8)
      const guildWebhooks = await rest.getGuildWebhooks(channel.guildId!)
      // console.log('in guild channel webhook helper', 9)
      expect(guildWebhooks.length).to.greaterThan(1)
      // console.log('in guild channel webhook helper', 10)
    })
  })

  describe('Webhook Message helpers', async () => {
    let message: Camelize<DiscordMessage>

    beforeEach(async () => {
      const msg = await rest.executeWebhook(webhook.id, webhook.token!, {
        content: 'discordeno is best lib',
        wait: true,
      })
      if (!msg) throw new Error('message not send')
      message = msg
    })

    it('Can send message with webhook', async () => {
      expect(message?.id).to.exist
    })

    it('Can delete a message with webhook', async () => {
      await rest.deleteWebhookMessage(webhook.id, webhook.token!, message.id)
      await expect(rest.getWebhookMessage(webhook.id, webhook.token!, message.id)).to.eventually.rejected
    })

    it('Can get a message with webhook', async () => {
      const fetched = await rest.getWebhookMessage(webhook.id, webhook.token!, message.id)

      expect(fetched).to.exist
      expect(fetched.content).to.equal(message.content)
    })

    it('Can edit a message with webhook', async () => {
      const edited = await rest.editWebhookMessage(webhook.id, webhook.token!, message.id, {
        content: 'different',
      })

      expect(edited).to.exist
      expect(edited.content).to.not.equal(message.content)
    })
  })
})
