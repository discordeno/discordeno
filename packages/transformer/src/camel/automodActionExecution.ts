import type {
  Camelize,
  DiscordAutoModerationActionExecution
} from '@discordeno/types'

export function c1amelize1AutoModerationActionExecution (
  payload: DiscordAutoModerationActionExecution
): Camelize<DiscordAutoModerationActionExecution> {
  return {
    guildId: payload.guild_id,
    action: {
      type: payload.action.type,
      metadata: {
        durationSeconds: payload.action.metadata.duration_seconds,
        channelId: payload.action.metadata.channel_id
      }
    },
    ruleId: payload.rule_id,
    ruleTriggerType: payload.rule_trigger_type,
    userId: payload.user_id,
    channelId: payload.channel_id,
    messageId: payload.message_id,
    alertSystemMessageId: payload.alert_system_message_id,
    content: payload.content,
    matchedKeyword: payload.matched_keyword ?? '',
    matchedContent: payload.matched_content ?? ''
  }
}
