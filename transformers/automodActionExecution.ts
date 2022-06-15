import { Bot } from "../bot.ts";
import { DiscordAutoModerationActionExecution } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformAutoModerationActionExecution(bot: Bot, payload: DiscordAutoModerationActionExecution) {
  const rule = {
    content: payload.content,
    ruleTriggerType: payload.rule_trigger_type,
    guildId: bot.transformers.snowflake(payload.guild_id),
    ruleId: bot.transformers.snowflake(payload.rule_id),
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    messageId: payload.message_id ? bot.transformers.snowflake(payload.message_id) : undefined,
    alertSystemMessageId: payload.alert_system_message_id
      ? bot.transformers.snowflake(payload.alert_system_message_id)
      : undefined,
    matchedKeyword: payload.matched_keyword ?? "",
    matchedContent: payload.matched_content ?? "",
    action: {
      type: payload.action.type,
      metadata: {
        durationSeconds: payload.action.metadata.duration_seconds,
        channelId: payload.action.metadata.channel_id
          ? bot.transformers.snowflake(payload.action.metadata.channel_id)
          : undefined,
      },
    },
  };

  return rule as Optionalize<typeof rule>;
}

export interface AutoModerationActionExecution extends ReturnType<typeof transformAutoModerationActionExecution> {}
