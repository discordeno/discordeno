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

describe('Webhook helpers', async () => {
  it('Manage webhooks', async () => {
    const channel = await rest.createChannel(e2eCache.guild.id, {
      name: 'wbhook',
    })

    const webhook = await rest.createWebhook(channel.id, {
      name: 'idk',
    })

    expect(webhook).to.exist
    expect(webhook.name).to.equal('idk')
    expect(webhook.token).to.exist

    const fetched = await rest.getWebhook(webhook.id)
    expect(fetched).to.exist
    expect(webhook.id).to.equal(fetched.id)

    const fetched2 = await rest.getWebhookWithToken(webhook.id, webhook.token!)
    expect(webhook.id).to.equal(fetched2.id)

    const edited = await rest.editWebhook(webhook.id, {
      name: 'edited',
    })

    expect(webhook.name).to.not.equal(edited.name)

    const edited2 = await rest.editWebhookWithToken(webhook.id, webhook.token!, {
      name: 'editedtoken',
    })

    expect(edited.name).to.not.equal(edited2.name)

    await rest.createWebhook(channel.id, { name: 'idkk' })
    const hooks = await rest.getChannelWebhooks(channel.id)
    expect(hooks.length).to.greaterThan(1)

    const guildHooks = await rest.getGuildWebhooks(channel.guildId!)
    expect(guildHooks.length).to.greaterThan(1)

    await rest.deleteWebhook(webhook.id)
    // Fetch the webhook to validate it was deleted
    await expect(rest.getWebhook(webhook.id)).to.eventually.rejected

    const hookToDelete = await rest.createWebhook(channel.id, {
      name: 'delme',
    })
    expect(hookToDelete?.id).to.exist
    expect(hookToDelete.token).to.exist

    await rest.deleteWebhookWithToken(hookToDelete.id, hookToDelete.token!)

    // Fetch the webhook to validate it was deleted
    await expect(rest.getWebhook(hookToDelete.id)).to.eventually.rejected
  })

  it('Manage webhook messages', async () => {
    const channel = await rest.createChannel(e2eCache.guild.id, {
      name: 'wbhook',
    })
    const webhook = await rest.createWebhook(channel.id, {
      name: 'idk',
    })
    expect(webhook).to.exist

    const message = await rest.executeWebhook(webhook.id, webhook.token!, {
      content: 'discordeno is best lib',
      wait: true,
    })
    expect(message?.id).to.exist

    const message2 = await rest.getWebhookMessage(webhook.id, webhook.token!, message!.id)

    expect(message2).to.exist
    expect(message2.content).to.equal(message?.content)

    const edited3 = await rest.editWebhookMessage(webhook.id, webhook.token!, message!.id, {
      content: 'different',
    })

    expect(edited3).to.exist
    expect(edited3.content).to.not.equal(message2.content)

    await rest.deleteWebhookMessage(webhook.id, webhook.token!, message!.id)
    await expect(rest.getWebhookMessage(webhook.id, webhook.token!, message!.id)).to.eventually.rejected
  })
})
