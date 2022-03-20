import type { Bot } from "../../bot.ts";
import { Guild } from "../../transformers/guild.ts";
import { User } from "../../transformers/member.ts";
import { DiscordTemplate } from "../../types/discord.ts";

/** Creates a template for the guild. Requires the `MANAGE_GUILD` permission. */
export async function createGuildTemplate(bot: Bot, guildId: bigint, data: Template) {
  if (data.name.length < 1 || data.name.length > 100) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  return await bot.rest.runMethod<DiscordTemplate>(bot.rest, "post", bot.constants.endpoints.GUILD_TEMPLATES(guildId), {
    code: data.code,
    name: data.name,
    description: data.description,
    usage_count: data.usageCount,
    creator_id: data.creatorId,
    creator: data.creator,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    source_guild_id: data.sourceGuildId,
    serialized_source_guild: data.serializedSourceGuild,
    is_dirty: data.isDirty,
  });
}

export interface Template {
  /** The template code (unique Id) */
  code: string;
  /** Template name */
  name: string;
  /** The description for the template */
  description: string;
  /** Number of times this template has been used */
  usageCount: number;
  /** The Id of the user who created the template */
  creatorId: string;
  /** The user who created the template */
  creator: User;
  /** When this template was created */
  createdAt: string;
  /** When this template was last synced to the source guild */
  updatedAt: string;
  /** The Id of the guild this template is based on */
  sourceGuildId: string;
  /** The guild snapshot this template contains */
  serializedSourceGuild: Partial<Guild>;
  /** Whether the template has unsynced changes */
  isDirty: boolean;
}
