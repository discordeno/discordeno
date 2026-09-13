import type { DiscordTemplate } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { Template } from './types.js';
export function transformTemplate(bot: Bot, payload: Partial<DiscordTemplate>, extra?: { partial?: boolean }) {
  const template = {} as SetupDesiredProps<Template, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.code) template.code = payload.code;
  if (payload.name) template.name = payload.name;
  if (payload.description) template.description = payload.description;
  if (payload.usage_count) template.usageCount = payload.usage_count;
  if (payload.creator_id) template.creatorId = bot.transformers.snowflake(payload.creator_id);
  if (payload.creator) template.creator = bot.transformers.user(bot, payload.creator);
  if (payload.created_at) template.createdAt = Date.parse(payload.created_at);
  if (payload.updated_at) template.updatedAt = Date.parse(payload.updated_at);
  if (payload.source_guild_id) template.sourceGuildId = bot.transformers.snowflake(payload.source_guild_id);
  if (payload.serialized_source_guild) template.serializedSourceGuild = payload.serialized_source_guild;
  if (payload.is_dirty) template.isDirty = payload.is_dirty;

  return callCustomizer('template', bot, payload, template, {
    partial: extra?.partial ?? false,
  });
}
