import type { Camelize, DiscordChannel } from '@discordeno/types'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { afterEach, beforeEach, describe, it } from 'mocha'
import { createRestManager } from '../../src/restManager.js'
import { CACHED_COMMUNITY_GUILD_ID, token } from './utils.js'
chai.use(chaiAsPromised)

describe('[webhooks] Webhook related tests', async () => {
  const rest = createRestManager({
    token
  })
  let channel: Camelize<DiscordChannel>

  beforeEach(async () => {
    channel = await rest.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'wbhook'
    })
    expect(channel.id).to.exist
  })

  afterEach(async () => {
    await rest.deleteChannel(channel.id)
  })

  it('[webhooks] Create a webhook', async () => {
    const webhook = await rest.createWebhook(channel.id, {
      name: 'idk'
    })
    expect(webhook).to.exist
    expect(webhook.name).to.equal('idk')
    await rest.deleteWebhook(webhook.id)
  })

  it('[webhook] delete a webhook', async () => {
    const webhook = await rest.createWebhook(channel.id, {
      name: 'delete'
    })
    expect(webhook?.id).to.exist

    await rest.deleteWebhook(webhook.id)

    // Fetch the webhook to validate it was deleted
    expect(rest.getWebhook(webhook.id)).to.eventually.rejected
  })

  it('[webhook] delete a webhook with token', async () => {
    const webhook = await rest.createWebhook(channel.id, { name: 'delete' })
    expect(webhook?.id).to.exist
    expect(webhook.token).to.exist

    await rest.deleteWebhookWithToken(webhook.id, webhook.token)

    // Fetch the webhook to validate it was deleted
    expect(rest.getWebhook(webhook.id)).to.eventually.rejected
  })

  describe('[webhooks] Guild webhook', async () => {
    let webhook: any

    beforeEach(async () => {
      webhook = await rest.createWebhook(channel.id, {
        name: 'idk'
      })
    })

    afterEach(async () => {
      await rest.deleteWebhook(webhook.id)
    })

    it('[webhooks] Edit a webhook', async (t) => {
      const edited = await rest.editWebhook(webhook.id, {
        name: 'edited'
      })

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('[webhooks] Edit a webhook with token', async () => {
      expect(webhook.token).to.exist
      const edited = await rest.editWebhookWithToken(
        webhook.id,
        webhook.token,
        {
          name: 'editedtoken'
        }
      )

      expect(webhook.name).to.not.equal(edited.name)
    })

    it('[webhooks] Get a webhook', async () => {
      const fetched = await rest.getWebhook(webhook.id)
      expect(fetched).to.exist
      expect(webhook.id).to.equal(fetched.id)
    })

    it('[webhooks] Get a webhook with a token', async () => {
      expect(webhook.token).to.exist
      const fetched = await rest.getWebhookWithToken(webhook.id, webhook.token)
      expect(webhook.id).to.equal(fetched.id)
    })
  })

  describe('[webhooks] Get channel webhooks', async () => {
    const second = await rest.createWebhook(channel.id, {
      name: 'what nonsense'
    })

    expect(second).to.exist
    const fetched = await rest.getChannelWebhooks(channel.id)
    expect(fetched.size).to.greaterThan(1)

    it('[webhooks] Get guild webhooks', async () => {
      const guildWebhooks = await rest.getGuildWebhooks(channel.guildId!)
      expect(guildWebhooks.size).to.greaterThan(1)
    })
  })
})
