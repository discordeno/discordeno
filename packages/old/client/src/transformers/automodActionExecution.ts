import type {
  DiscordAutoModerationActionExecution,
  Optionalize
} from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAutoModerationActionExecution (
  client: Client,
  payload: DiscordAutoModerationActionExecution
) {
  const rule = {
    content: payload.content,
    ruleTriggerType: payload.rule_trigger_type,
    guildId: client.transformers.snowflake(payload.guild_id),
    ruleId: client.transformers.snowflake(payload.rule_id),
    userId: client.transformers.snowflake(payload.user_id),
    channelId: payload.channel_id
      ? client.transformers.snowflake(payload.channel_id)
      : undefined,
    messageId: payload.message_id
      ? client.transformers.snowflake(payload.message_id)
      : undefined,
    alertSystemMessageId: payload.alert_system_message_id
      ? client.transformers.snowflake(payload.alert_system_message_id)
      : undefined,
    matchedKeyword: payload.matched_keyword ?? '',
    matchedContent: payload.matched_content ?? '',
    action: {
      type: payload.action.type,
      metadata: {
        durationSeconds: payload.action.metadata.duration_seconds,
        channelId: payload.action.metadata.channel_id
          ? client.transformers.snowflake(payload.action.metadata.channel_id)
          : undefined
      }
    }
  }

  return rule as Optionalize<typeof rule>
}

export interface AutoModerationActionExecution
  extends ReturnType<typeof transformAutoModerationActionExecution> {}
