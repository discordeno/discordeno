import { Bot } from "../bot.ts";
import { DiscordTemplate } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformTemplate(bot: Bot, payload: DiscordTemplate) {
  const template = {
    code: payload.code,
    name: payload.name,
    description: payload.description,
    usageCount: payload.usage_count,
    creatorId: bot.transformers.snowflake(payload.creator_id),
    creator: bot.transformers.user(bot, payload.creator),
    createdAt: Date.parse(payload.created_at),
    updatedAt: Date.parse(payload.updated_at),
    sourceGuildId: bot.transformers.snowflake(payload.source_guild_id),
    serializedSourceGuild: payload.serialized_source_guild,
    isDirty: payload.is_dirty ?? undefined,
  };

  return template as Optionalize<typeof template>;
}

export interface Template extends ReturnType<typeof transformTemplate> {}
