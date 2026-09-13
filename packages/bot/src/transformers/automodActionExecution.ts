import type { DiscordAutoModerationAction, DiscordAutoModerationActionExecution, DiscordAutoModerationActionMetadata } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { AutoModerationAction, AutoModerationActionExecution, AutoModerationActionMetadata } from './types.js';

export function transformAutoModerationActionExecution(
  bot: Bot,
  payload: Partial<DiscordAutoModerationActionExecution>,
  extra?: { partial?: boolean },
) {
  const autoModerationActionExecution = {} as SetupDesiredProps<
    AutoModerationActionExecution,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (payload.content) autoModerationActionExecution.content = payload.content;
  if (payload.rule_trigger_type !== undefined) autoModerationActionExecution.ruleTriggerType = payload.rule_trigger_type;
  if (payload.guild_id) autoModerationActionExecution.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.rule_id) autoModerationActionExecution.ruleId = bot.transformers.snowflake(payload.rule_id);
  if (payload.user_id) autoModerationActionExecution.userId = bot.transformers.snowflake(payload.user_id);
  if (payload.channel_id) autoModerationActionExecution.channelId = bot.transformers.snowflake(payload.channel_id);
  if (payload.message_id) autoModerationActionExecution.messageId = bot.transformers.snowflake(payload.message_id);
  if (payload.alert_system_message_id)
    autoModerationActionExecution.alertSystemMessageId = bot.transformers.snowflake(payload.alert_system_message_id);
  if (payload.matched_keyword) autoModerationActionExecution.matchedKeyword = payload.matched_keyword;
  if (payload.matched_content) autoModerationActionExecution.matchedContent = payload.matched_content;
  if (payload.action) autoModerationActionExecution.action = bot.transformers.autoModerationAction(bot, payload.action);

  return callCustomizer('autoModerationActionExecution', bot, payload, autoModerationActionExecution, {
    partial: extra?.partial ?? false,
  });
}

export function transformAutoModerationActionMetadata(
  bot: Bot,
  payload: Partial<DiscordAutoModerationActionMetadata>,
  extra?: { partial?: boolean },
) {
  const autoModerationActionMetadata = {} as SetupDesiredProps<
    AutoModerationActionMetadata,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (payload.duration_seconds !== undefined) autoModerationActionMetadata.durationSeconds = payload.duration_seconds;
  if (payload.custom_message) autoModerationActionMetadata.customMessage = payload.custom_message;
  if (payload.channel_id) autoModerationActionMetadata.channelId = bot.transformers.snowflake(payload.channel_id);

  return callCustomizer('autoModerationActionMetadata', bot, payload, autoModerationActionMetadata, {
    partial: extra?.partial ?? false,
  });
}

export function transformAutoModerationAction(bot: Bot, payload: Partial<DiscordAutoModerationAction>, extra?: { partial?: boolean }) {
  const autoModerationAction = {} as SetupDesiredProps<AutoModerationAction, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.type !== undefined) autoModerationAction.type = payload.type;
  if (payload.metadata) autoModerationAction.metadata = bot.transformers.autoModerationActionMetadata(bot, payload.metadata);

  return callCustomizer('autoModerationAction', bot, payload, autoModerationAction, {
    partial: extra?.partial ?? false,
  });
}
