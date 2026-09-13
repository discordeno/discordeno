import type { DiscordAutoModerationRule, DiscordAutoModerationRuleTriggerMetadata } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { AutoModerationRule, AutoModerationRuleTriggerMetadata } from './types.js';

export function transformAutoModerationRule(bot: Bot, payload: Partial<DiscordAutoModerationRule>, extra?: { partial?: boolean }) {
  const autoModerationRule = {} as SetupDesiredProps<AutoModerationRule, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.name) autoModerationRule.name = payload.name;
  if (payload.event_type !== undefined) autoModerationRule.eventType = payload.event_type;
  if (payload.trigger_type !== undefined) autoModerationRule.triggerType = payload.trigger_type;
  if (payload.enabled !== undefined) autoModerationRule.enabled = payload.enabled;
  if (payload.id) autoModerationRule.id = bot.transformers.snowflake(payload.id);
  if (payload.guild_id) autoModerationRule.guildId = bot.transformers.snowflake(payload.guild_id);
  if (payload.creator_id) autoModerationRule.creatorId = bot.transformers.snowflake(payload.creator_id);
  if (payload.exempt_roles) autoModerationRule.exemptRoles = payload.exempt_roles.map((id) => bot.transformers.snowflake(id));
  if (payload.exempt_channels) autoModerationRule.exemptChannels = payload.exempt_channels.map((id) => bot.transformers.snowflake(id));
  if (payload.trigger_metadata)
    autoModerationRule.triggerMetadata = bot.transformers.autoModerationRuleTriggerMetadata(bot, payload.trigger_metadata);
  if (payload.actions) autoModerationRule.actions = payload.actions.map((action) => bot.transformers.autoModerationAction(bot, action));

  return callCustomizer('autoModerationRule', bot, payload, autoModerationRule, {
    partial: extra?.partial ?? false,
  });
}

export function transformautoModerationRuleTriggerMetadata(
  bot: Bot,
  payload: Partial<DiscordAutoModerationRuleTriggerMetadata>,
  extra?: { partial?: boolean },
) {
  const triggerMetadata = {} as SetupDesiredProps<AutoModerationRuleTriggerMetadata, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.keyword_filter) triggerMetadata.keywordFilter = payload.keyword_filter;
  if (payload.regex_patterns) triggerMetadata.regexPatterns = payload.regex_patterns;
  if (payload.presets) triggerMetadata.presets = payload.presets;
  if (payload.allow_list) triggerMetadata.allowList = payload.allow_list;
  if (payload.mention_total_limit !== undefined) triggerMetadata.mentionTotalLimit = payload.mention_total_limit;
  if (payload.mention_raid_protection_enabled !== undefined) triggerMetadata.mentionRaidProtectionEnabled = payload.mention_raid_protection_enabled;

  return callCustomizer('autoModerationRuleTriggerMetadata', bot, payload, triggerMetadata, {
    partial: extra?.partial ?? false,
  });
}
