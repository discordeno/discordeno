import type { CreateGuildRole } from "../../types/guilds/createGuildRole.ts";
import type { Bot } from "../../bot.ts";
import { DiscordRole } from "../../types/discord.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(bot: Bot, guildId: bigint, options: CreateGuildRole, reason?: string) {
  const result = await bot.rest.runMethod<DiscordRole>(bot.rest, "post", bot.constants.endpoints.GUILD_ROLES(guildId), {
    name: options.name,
    color: options.color,
    hoist: options.hoist,
    mentionable: options.mentionable,
    permissions: bot.utils.calculateBits(options?.permissions || []),
    reason,
  });

  const role = bot.transformers.role(bot, {
    role: result,
    guildId,
  });

  return role;
}
