import type { DiscordTemplate } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Template } from './types.js';
export function transformTemplate(bot: Bot, payload: Partial<DiscordTemplate>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.template;
  const template = {} as SetupDesiredProps<Template, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.code && payload.code) template.code = payload.code;
  if (props.name && payload.name) template.name = payload.name;
  if (props.description && payload.description) template.description = payload.description;
  if (props.usageCount && payload.usage_count !== undefined) template.usageCount = payload.usage_count;
  if (props.creatorId && payload.creator_id) template.creatorId = bot.transformers.snowflake(payload.creator_id);
  if (props.creator && payload.creator) template.creator = bot.transformers.user(bot, payload.creator);
  if (props.createdAt && payload.created_at) template.createdAt = Date.parse(payload.created_at);
  if (props.updatedAt && payload.updated_at) template.updatedAt = Date.parse(payload.updated_at);
  if (props.sourceGuildId && payload.source_guild_id) template.sourceGuildId = bot.transformers.snowflake(payload.source_guild_id);
  if (props.serializedSourceGuild && payload.serialized_source_guild) template.serializedSourceGuild = payload.serialized_source_guild;
  if (props.isDirty && typeof payload.is_dirty === 'boolean') template.isDirty = payload.is_dirty;

  return callCustomizer('template', bot, payload, template, {
    partial: extra?.partial ?? false,
  });
}
