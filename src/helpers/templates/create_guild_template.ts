import type { Template } from "../../types/templates/template.ts";
import type {Bot} from "../../bot.ts";
import {User} from "../../types/users/user.ts";
import {Guild} from "../../types/guilds/guild.ts";

/**
 * Creates a template for the guild.
 * Requires the `MANAGE_GUILD` permission.
 * @param bot
 * @param guildId
 * @param data
 */
export async function createGuildTemplate(bot: Bot, guildId: bigint, data: Template) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  if (data.name.length < 1 || data.name.length > 100) {
    throw new Error("The name can only be in between 1-100 characters.");
  }

  if (data.description?.length && data.description.length > 120) {
    throw new Error("The description can only be in between 0-120 characters.");
  }

  return await bot.rest.runMethod<Template>(bot.rest,"post", bot.constants.endpoints.GUILD_TEMPLATES(guildId), {
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
    is_dirty: data.isDirty
  });
}
