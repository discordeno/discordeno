import {
  AutoModerationActionType,
  AutoModerationEventTypes,
  AutoModerationTriggerTypes
} from '@discordeno/types'
import { expect } from 'chai'
import { CACHED_COMMUNITY_GUILD_ID, rest } from './utils.js'

describe('[automod] Run automod tests', async () => {
  it('[automod] Create a MessageSend rule for Keyword with BlockMessage action.', async () => {
    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.BlockMessage
        }
      ]
    })

    expect(rule.id).to.be.exist

    const fetchedRule = await rest.getAutomodRule(
      CACHED_COMMUNITY_GUILD_ID,
      rule.id
    )

    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(
      AutoModerationEventTypes.MessageSend
    )
    expect(fetchedRule.triggerType).to.equal(
      AutoModerationTriggerTypes.Keyword
    )
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal(
      'iblamewolf'
    )
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[0].type).to.equal(
      AutoModerationActionType.BlockMessage
    )

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
  })

  it('[automod] Create a MessageSend rule for Keyword with SendAlertMessage action.', async () => {
    const channel = await rest.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test'
    })
    expect(channel.id).to.be.exist

    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.SendAlertMessage,
          metadata: {
            channelId: channel.id
          }
        }
      ]
    })

    expect(rule.id).to.be.exist

    const fetchedRule = await rest.getAutomodRule(
      CACHED_COMMUNITY_GUILD_ID,
      rule.id
    )

    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(
      AutoModerationEventTypes.MessageSend
    )
    expect(fetchedRule.triggerType).to.equal(
      AutoModerationTriggerTypes.Keyword
    )
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal(
      'iblamewolf'
    )
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[0].type).to.equal(
      AutoModerationActionType.SendAlertMessage
    )
    expect(fetchedRule.actions[0].metadata?.channelId).to.equal(channel.id)

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
    await rest.deleteChannel(channel.id)
  })

  it('[automod] Create a MessageSend rule for Keyword with Timeout action.', async () => {
    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10
          }
        }
      ]
    })

    expect(rule.id).to.be.exist

    const fetchedRule = await rest.getAutomodRule(
      CACHED_COMMUNITY_GUILD_ID,
      rule.id
    )

    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(
      AutoModerationEventTypes.MessageSend
    )
    expect(fetchedRule.triggerType).to.equal(
      AutoModerationTriggerTypes.Keyword
    )
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal(
      'iblamewolf'
    )
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[0].type).to.equal(
      AutoModerationActionType.Timeout
    )
    expect(fetchedRule.actions[0].metadata?.durationSeconds).to.equal(10)

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
  })

  it('[automod] Create a MessageSend rule for Keyword with BlockMessage & Timeout action.', async () => {
    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.BlockMessage
        },
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10
          }
        }
      ]
    })

    expect(rule.id).to.be.exist

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
  })

  it('[automod] Create a MessageSend rule for Keyword with SendAlertMessage & Timeout action.', async () => {
    const channel = await rest.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test'
    })
    expect(channel.id).to.be.exist

    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.SendAlertMessage,
          metadata: {
            channelId: channel.id
          }
        },
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10
          }
        }
      ]
    })

    expect(rule.id).to.be.exist

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
    await rest.deleteChannel(channel.id)
  })

  it('[automod] Create a MessageSend rule for Keyword with BlockMessage & SendAlertMessage & Timeout action.', async () => {
    const channel = await rest.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test'
    })

    const rule = await rest.createAutomodRule(CACHED_COMMUNITY_GUILD_ID, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf']
      },
      actions: [
        {
          type: AutoModerationActionType.BlockMessage
        },
        {
          type: AutoModerationActionType.SendAlertMessage,
          metadata: {
            channelId: channel.id
          }
        },
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10
          }
        }
      ]
    })

    expect(rule.id).to.be.exist

    // Get the rule again to make sure it was created correctly
    const fetchedRule = await rest.getAutomodRule(
      CACHED_COMMUNITY_GUILD_ID,
      rule.id
    )
    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(
      AutoModerationEventTypes.MessageSend
    )
    expect(fetchedRule.triggerType).to.equal(
      AutoModerationTriggerTypes.Keyword
    )
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal(
      'iblamewolf'
    )
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[1].metadata).to.be.exist
    expect(fetchedRule.actions[2].metadata).to.be.exist
    expect(fetchedRule.actions[1].metadata.channelId).to.equal(channel.id)
    expect(fetchedRule.actions[2].metadata.durationSeconds).to.equal(10)
    expect(fetchedRule.actions[0].type).to.equal(
      AutoModerationActionType.BlockMessage
    )
    expect(fetchedRule.actions[1].type).to.equal(
      AutoModerationActionType.SendAlertMessage
    )
    expect(fetchedRule.actions[2].type).to.equal(
      AutoModerationActionType.Timeout
    )

    await rest.deleteAutomodRule(CACHED_COMMUNITY_GUILD_ID, rule.id)
    await rest.deleteChannel(channel.id)
  })
})
