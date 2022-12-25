import type {
  Camelize,
  DiscordChannel,
  DiscordGuild,
  DiscordMessage,
  DiscordWebhook
} from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { afterEach, beforeEach, describe, it } from 'mocha'
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

// waiting for channel
describe('[webhooks] Webhook helpers', async () => {
  let channel: Camelize<DiscordChannel>

  beforeEach(async () => {
    channel = await rest.createChannel(guild.id, {
      name: 'wbhook'
    })
    expect(channel.id).to.exist
  })

  afterEach(async () => {
    await rest.deleteChannel(channel.id)
  })

  describe('General webhook helpers', () => {
    let webhook: Camelize<DiscordWebhook>

    beforeEach(async () => {
      webhook = await rest.createWebhook(channel.id, {
        name: 'idk'
      })
    })

    it('Can create a webhook', async () => {
      expect(webhook).to.exist
      expect(webhook.name).to.equal('idk')
    })

    it('Can delete a webhook', async () => {
      await rest.deleteWebhook(webhook.id)

      // Fetch the webhook to validate it was deleted
      await expect(rest.getWebhook(webhook.id)).to.eventually.rejected
    })

    it('Can delete a webhook with token', async () => {
      expect(webhook?.id).to.exist
      expect(webhook.token).to.exist

      await rest.deleteWebhookWithToken(webhook.id, webhook.token!)

      // Fetch the webhook to validate it was deleted
      await expect(rest.getWebhook(webhook.id)).to.eventually.rejected
    })
  })

  describe('Guild webhook helpers', async () => {
    let webhook: Camelize<DiscordWebhook>

    beforeEach(async () => {
      webhook = await rest.createWebhook(channel.id, {
        name: 'idk'
      })
    })

    afterEach(async () => {
      /** no need extra delete Webhook becuase we delete the channel contain the webhook */
      // await rest.deleteWebhook(webhook.id)
    })

    it('Can edit a guild webhook', async () => {
      const edited = await rest.editWebhook(webhook.id, {
        name: 'edited'
      })

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('Can edit a guild webhook with token', async () => {
      const edited = await rest.editWebhookWithToken(
        webhook.id,
        webhook.token!,
        {
          name: 'editedtoken'
        }
      )

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('Can get a guild webhook', async () => {
      const fetched = await rest.getWebhook(webhook.id)
      expect(fetched).to.exist
      expect(webhook.id).to.equal(fetched.id)
    })

    it('Can get a guild webhook with a token', async () => {
      expect(webhook.token).to.exist
      const fetched = await rest.getWebhookWithToken(
        webhook.id,
        webhook.token!
      )
      expect(webhook.id).to.equal(fetched.id)
    })
  })

  describe('Guild channel webhook helpers', async () => {
    const second = await rest.createWebhook(channel.id, {
      name: 'what nonsense'
    })

    it('Can create guild channel webhooks', async () => {
      expect(second).to.exist
      const fetched = await rest.getChannelWebhooks(channel.id)
      expect(fetched.size).to.greaterThan(1)
    })

    it('Can get a guild channel webhooks', async () => {
      const guildWebhooks = await rest.getGuildWebhooks(channel.guildId!)
      expect(guildWebhooks.size).to.greaterThan(1)
    })
  })

  describe('Webhook Message helpers', async () => {
    let webhook: Camelize<DiscordWebhook>
    let message: Camelize<DiscordMessage>

    beforeEach(async () => {
      webhook = await rest.createWebhook(channel.id, {
        name: 'idk'
      })
      const msg = await rest.sendWebhookMessage(webhook.id, webhook.token!, {
        content: 'discordeno is best lib',
        wait: true
      })
      if (!msg) throw new Error('message not send')
      message = msg
    })

    it('Can send message with webhook', async () => {
      expect(message?.id).to.exist
    })

    it('Can delete a message with webhook', async () => {
      await rest.deleteWebhookMessage(webhook.id, webhook.token!, message.id)
      await expect(
        rest.getWebhookMessage(webhook.id, webhook.token!, message.id)
      ).to.eventually.rejected
    })

    it('Can get a message with webhook', async () => {
      const fetched = await rest.getWebhookMessage(
        webhook.id,
        webhook.token!,
        message.id
      )

      expect(fetched).to.exist
      expect(fetched.content).to.equal(message.content)
    })

    it('Can edit a message with webhook', async () => {
      const edited = await rest.editWebhookMessage(
        webhook.id,
        webhook.token!,
        message.id,
        {
          content: 'different'
        }
      )

      expect(edited).to.exist
      expect(edited.content).to.not.equal(message.content)
    })
  })
})
