import type { DiscordAutoModerationRule, DiscordAutoModerationRuleTriggerMetadata } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { AutoModerationRule, AutoModerationRuleTriggerMetadata } from './types.js';

export function transformAutoModerationRule(bot: Bot, payload: Partial<DiscordAutoModerationRule>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.autoModerationRule;
  const autoModerationRule = {} as SetupDesiredProps<AutoModerationRule, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.name && payload.name) autoModerationRule.name = payload.name;
  if (props.eventType && payload.event_type !== undefined) autoModerationRule.eventType = payload.event_type;
  if (props.triggerType && payload.trigger_type !== undefined) autoModerationRule.triggerType = payload.trigger_type;
  if (props.enabled && payload.enabled !== undefined) autoModerationRule.enabled = payload.enabled;
  if (props.id && payload.id) autoModerationRule.id = bot.transformers.snowflake(payload.id);
  if (props.guildId && payload.guild_id) autoModerationRule.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.creatorId && payload.creator_id) autoModerationRule.creatorId = bot.transformers.snowflake(payload.creator_id);
  if (props.exemptRoles && payload.exempt_roles) autoModerationRule.exemptRoles = payload.exempt_roles.map((id) => bot.transformers.snowflake(id));
  if (props.exemptChannels && payload.exempt_channels)
    autoModerationRule.exemptChannels = payload.exempt_channels.map((id) => bot.transformers.snowflake(id));
  if (props.triggerMetadata && payload.trigger_metadata)
    autoModerationRule.triggerMetadata = bot.transformers.autoModerationRuleTriggerMetadata(bot, payload.trigger_metadata);
  if (props.actions && payload.actions)
    autoModerationRule.actions = payload.actions.map((action) => bot.transformers.autoModerationAction(bot, action));

  return callCustomizer('autoModerationRule', bot, payload, autoModerationRule, {
    partial: extra?.partial ?? false,
  });
}

export function transformAutoModerationRuleTriggerMetadata(
  bot: Bot,
  payload: Partial<DiscordAutoModerationRuleTriggerMetadata>,
  extra?: { partial?: boolean },
) {
  const props = bot.transformers.desiredProperties.autoModerationRuleTriggerMetadata;
  const triggerMetadata = {} as SetupDesiredProps<AutoModerationRuleTriggerMetadata, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.keywordFilter && payload.keyword_filter) triggerMetadata.keywordFilter = payload.keyword_filter;
  if (props.regexPatterns && payload.regex_patterns) triggerMetadata.regexPatterns = payload.regex_patterns;
  if (props.presets && payload.presets) triggerMetadata.presets = payload.presets;
  if (props.allowList && payload.allow_list) triggerMetadata.allowList = payload.allow_list;
  if (props.mentionTotalLimit && payload.mention_total_limit !== undefined) triggerMetadata.mentionTotalLimit = payload.mention_total_limit;
  if (props.mentionRaidProtectionEnabled && payload.mention_raid_protection_enabled !== undefined)
    triggerMetadata.mentionRaidProtectionEnabled = payload.mention_raid_protection_enabled;

  return callCustomizer('autoModerationRuleTriggerMetadata', bot, payload, triggerMetadata, {
    partial: extra?.partial ?? false,
  });
}
