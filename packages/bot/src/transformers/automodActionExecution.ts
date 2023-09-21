import type { DiscordAutoModerationActionExecution } from '@discordeno/types'
import type { Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformAutoModerationActionExecution(bot: Bot, payload: DiscordAutoModerationActionExecution) {
  const rule = {
    content: payload.content,
    ruleTriggerType: payload.rule_trigger_type,
    guildId: bot.transformers.snowflake(payload.guild_id),
    ruleId: bot.transformers.snowflake(payload.rule_id),
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    messageId: payload.message_id ? bot.transformers.snowflake(payload.message_id) : undefined,
    alertSystemMessageId: payload.alert_system_message_id ? bot.transformers.snowflake(payload.alert_system_message_id) : undefined,
    matchedKeyword: payload.matched_keyword ?? '',
    matchedContent: payload.matched_content ?? '',
    action: {
      type: payload.action.type,
      metadata: {
        durationSeconds: payload.action.metadata.duration_seconds,
        customMessage: payload.action.metadata.custom_message,
        channelId: payload.action.metadata.channel_id ? bot.transformers.snowflake(payload.action.metadata.channel_id) : undefined,
      },
    },
  }

  return bot.transformers.customizers.automodActionExecution(bot, payload, rule as AutoModerationActionExecution) as Optionalize<typeof rule>
}

export interface AutoModerationActionExecution extends ReturnType<typeof transformAutoModerationActionExecution> {}
