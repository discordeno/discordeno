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
  const props = bot.transformers.desiredProperties.autoModerationActionExecution;
  const autoModerationActionExecution = {} as SetupDesiredProps<
    AutoModerationActionExecution,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (props.content && payload.content) autoModerationActionExecution.content = payload.content;
  if (props.ruleTriggerType && payload.rule_trigger_type !== undefined) autoModerationActionExecution.ruleTriggerType = payload.rule_trigger_type;
  if (props.guildId && payload.guild_id) autoModerationActionExecution.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.ruleId && payload.rule_id) autoModerationActionExecution.ruleId = bot.transformers.snowflake(payload.rule_id);
  if (props.userId && payload.user_id) autoModerationActionExecution.userId = bot.transformers.snowflake(payload.user_id);
  if (props.channelId && payload.channel_id) autoModerationActionExecution.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.messageId && payload.message_id) autoModerationActionExecution.messageId = bot.transformers.snowflake(payload.message_id);
  if (props.alertSystemMessageId && payload.alert_system_message_id)
    autoModerationActionExecution.alertSystemMessageId = bot.transformers.snowflake(payload.alert_system_message_id);
  if (props.matchedKeyword && payload.matched_keyword) autoModerationActionExecution.matchedKeyword = payload.matched_keyword;
  if (props.matchedContent && payload.matched_content) autoModerationActionExecution.matchedContent = payload.matched_content;
  if (props.action && payload.action) autoModerationActionExecution.action = bot.transformers.autoModerationAction(bot, payload.action);

  return callCustomizer('autoModerationActionExecution', bot, payload, autoModerationActionExecution, {
    partial: extra?.partial ?? false,
  });
}

export function transformAutoModerationActionMetadata(
  bot: Bot,
  payload: Partial<DiscordAutoModerationActionMetadata>,
  extra?: { partial?: boolean },
) {
  const props = bot.transformers.desiredProperties.autoModerationActionMetadata;
  const autoModerationActionMetadata = {} as SetupDesiredProps<
    AutoModerationActionMetadata,
    TransformersDesiredProperties,
    DesiredPropertiesBehavior
  >;

  if (props.durationSeconds && payload.duration_seconds !== undefined) autoModerationActionMetadata.durationSeconds = payload.duration_seconds;
  if (props.customMessage && payload.custom_message) autoModerationActionMetadata.customMessage = payload.custom_message;
  if (props.channelId && payload.channel_id) autoModerationActionMetadata.channelId = bot.transformers.snowflake(payload.channel_id);

  return callCustomizer('autoModerationActionMetadata', bot, payload, autoModerationActionMetadata, {
    partial: extra?.partial ?? false,
  });
}

export function transformAutoModerationAction(bot: Bot, payload: Partial<DiscordAutoModerationAction>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.autoModerationAction;
  const autoModerationAction = {} as SetupDesiredProps<AutoModerationAction, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.type && payload.type !== undefined) autoModerationAction.type = payload.type;
  if (props.metadata && payload.metadata) autoModerationAction.metadata = bot.transformers.autoModerationActionMetadata(bot, payload.metadata);

  return callCustomizer('autoModerationAction', bot, payload, autoModerationAction, {
    partial: extra?.partial ?? false,
  });
}
