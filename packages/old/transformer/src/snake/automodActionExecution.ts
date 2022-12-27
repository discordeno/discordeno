import type { Camelize, DiscordAutoModerationActionExecution } from '@discordeno/types'

export function s1nakelize1AutoModerationActionExecution (payload: Camelize<DiscordAutoModerationActionExecution>): DiscordAutoModerationActionExecution {
  return {
    content: payload.content,

    guild_id: payload.guildId,
    rule_id: payload.ruleId,
    rule_trigger_type: payload.ruleTriggerType,
    user_id: payload.userId,
    channel_id: payload.channelId,
    message_id: payload.messageId,
    alert_system_message_id: payload.alertSystemMessageId,
    matched_keyword: payload.matchedKeyword,
    matched_content: payload.matchedContent,

    action: {
      type: payload.action.type,
      metadata: {
        duration_seconds: payload.action.metadata.durationSeconds,
        channel_id: payload.action.metadata.channelId
      }
    }
  }
}
