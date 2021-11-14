import type { CreateGuildRole } from "../../types/guilds/create_guild_role.ts";
import type { Role } from "../../types/permissions/role.ts";
import type { Bot } from "../../bot.ts";

/** Edit a guild role. Requires the MANAGE_ROLES permission. */
export async function editRole(bot: Bot, guildId: bigint, id: bigint, options: CreateGuildRole) {
  const result = await bot.rest.runMethod<Role>(bot.rest, "patch", bot.constants.endpoints.GUILD_ROLE(guildId, id), {
    name: options.name,
    color: options.color,
    hoist: options.hoist,
    mentionable: options.mentionable,
    permissions: options.permissions ? bot.utils.calculateBits(options.permissions) : undefined,
  });

  return bot.transformers.role(bot, { role: result, guildId });
}
