import { AutoModerationActionType, AutoModerationEventTypes, AutoModerationTriggerTypes } from '@discordeno/types'
import { expect } from 'chai'
import { e2eCache, rest, toDispose } from './utils.js'

describe('Automod tests', () => {
  it('Create a MessageSend rule for Keyword with BlockMessage action.', async () => {
    const rule = await rest.createAutomodRule(e2eCache.guild.id, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf'],
      },
      actions: [
        {
          type: AutoModerationActionType.BlockMessage,
        },
      ],
    })
    toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

    const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

    expect(rule.id).to.be.exist
    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.id).to.equal(rule.id)
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
    expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.BlockMessage)
  })

  it('Create a MessageSend rule for Keyword with Timeout action.', async () => {
    const rule = await rest.createAutomodRule(e2eCache.guild.id, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf'],
      },
      actions: [
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10,
          },
        },
      ],
    })
    toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

    const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

    expect(rule.id).to.be.exist
    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.id).to.equal(rule.id)
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
    expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
    expect(fetchedRule.actions).to.be.exist
    expect(fetchedRule.actions[0]).to.be.exist
    expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.Timeout)
    expect(fetchedRule.actions[0].metadata?.durationSeconds).to.equal(10)
  })

  it('Create a MessageSend rule for Keyword with BlockMessage & Timeout action.', async () => {
    const rule = await rest.createAutomodRule(e2eCache.guild.id, {
      name: 'test',
      eventType: AutoModerationEventTypes.MessageSend,
      triggerType: AutoModerationTriggerTypes.Keyword,
      triggerMetadata: {
        keywordFilter: ['iblamewolf'],
      },
      actions: [
        {
          type: AutoModerationActionType.BlockMessage,
        },
        {
          type: AutoModerationActionType.Timeout,
          metadata: {
            durationSeconds: 10,
          },
        },
      ],
    })
    toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

    const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

    expect(rule.id).to.be.exist
    expect(fetchedRule.id).to.be.exist
    expect(fetchedRule.id).to.equal(rule.id)
    expect(fetchedRule.name).to.equal(rule.name)
    expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
    expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
    expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
    expect(fetchedRule.actions).to.have.length(2)
    expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.BlockMessage)
    expect(fetchedRule.actions[1].type).to.equal(AutoModerationActionType.Timeout)
    expect(fetchedRule.actions[1].metadata?.durationSeconds).to.equal(10)
  })

  describe('with a channel', () => {
    it('Create a MessageSend rule for Keyword with SendAlertMessage action.', async () => {
      const rule = await rest.createAutomodRule(e2eCache.guild.id, {
        name: 'test',
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ['iblamewolf'],
        },
        actions: [
          {
            type: AutoModerationActionType.SendAlertMessage,
            metadata: {
              channelId: e2eCache.channel.id,
            },
          },
        ],
      })
      toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

      const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

      expect(rule.id).to.be.exist
      expect(fetchedRule.id).to.be.exist
      expect(fetchedRule.id).to.equal(rule.id)
      expect(fetchedRule.name).to.equal(rule.name)
      expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
      expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
      expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
      expect(fetchedRule.actions).to.be.exist
      expect(fetchedRule.actions[0]).to.be.exist
      expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.SendAlertMessage)
      expect(fetchedRule.actions[0].metadata?.channelId).to.equal(e2eCache.channel.id)
    })

    it('Create a MessageSend rule for Keyword with SendAlertMessage & Timeout action.', async () => {
      const rule = await rest.createAutomodRule(e2eCache.guild.id, {
        name: 'test',
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ['iblamewolf'],
        },
        actions: [
          {
            type: AutoModerationActionType.SendAlertMessage,
            metadata: {
              channelId: e2eCache.channel.id,
            },
          },
          {
            type: AutoModerationActionType.Timeout,
            metadata: {
              durationSeconds: 10,
            },
          },
        ],
      })
      toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

      const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

      expect(rule.id).to.be.exist
      expect(fetchedRule.id).to.be.exist
      expect(fetchedRule.id).to.equal(rule.id)
      expect(fetchedRule.name).to.equal(rule.name)
      expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
      expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
      expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
      expect(fetchedRule.actions).to.have.length(2)
      expect(fetchedRule.actions[0]).to.be.exist
      expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.SendAlertMessage)
      expect(fetchedRule.actions[0].metadata?.channelId).to.equal(e2eCache.channel.id)
      expect(fetchedRule.actions[1].type).to.equal(AutoModerationActionType.Timeout)
      expect(fetchedRule.actions[1].metadata?.durationSeconds).to.equal(10)
    })

    it('Create a MessageSend rule for Keyword with BlockMessage & SendAlertMessage & Timeout action.', async () => {
      const rule = await rest.createAutomodRule(e2eCache.guild.id, {
        name: 'test',
        eventType: AutoModerationEventTypes.MessageSend,
        triggerType: AutoModerationTriggerTypes.Keyword,
        triggerMetadata: {
          keywordFilter: ['iblamewolf'],
        },
        actions: [
          {
            type: AutoModerationActionType.BlockMessage,
          },
          {
            type: AutoModerationActionType.SendAlertMessage,
            metadata: {
              channelId: e2eCache.channel.id,
            },
          },
          {
            type: AutoModerationActionType.Timeout,
            metadata: {
              durationSeconds: 10,
            },
          },
        ],
      })
      toDispose.add(async () => await rest.deleteAutomodRule(e2eCache.guild.id, rule.id))

      // Get the rule again to make sure it was created correctly
      const fetchedRule = await rest.getAutomodRule(e2eCache.guild.id, rule.id)

      expect(rule.id).to.be.exist
      expect(fetchedRule.id).to.be.exist
      expect(fetchedRule.id).to.equal(rule.id)
      expect(fetchedRule.name).to.equal(rule.name)
      expect(fetchedRule.eventType).to.equal(AutoModerationEventTypes.MessageSend)
      expect(fetchedRule.triggerType).to.equal(AutoModerationTriggerTypes.Keyword)
      expect(fetchedRule.triggerMetadata?.keywordFilter?.[0]).to.equal('iblamewolf')
      expect(fetchedRule.actions).to.be.exist
      expect(fetchedRule.actions[0]).to.be.exist
      expect(fetchedRule.actions[1].metadata).to.be.exist
      expect(fetchedRule.actions[2].metadata).to.be.exist
      expect(fetchedRule.actions[1].metadata?.channelId).to.equal(e2eCache.channel.id)
      expect(fetchedRule.actions[2].metadata?.durationSeconds).to.equal(10)
      expect(fetchedRule.actions[0].type).to.equal(AutoModerationActionType.BlockMessage)
      expect(fetchedRule.actions[1].type).to.equal(AutoModerationActionType.SendAlertMessage)
      expect(fetchedRule.actions[2].type).to.equal(AutoModerationActionType.Timeout)
    })
  })
})
