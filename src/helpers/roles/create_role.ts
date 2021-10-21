import type { CreateGuildRole } from "../../types/guilds/create_guild_role.ts";
import type { Role } from "../../types/permissions/role.ts";
import type { Bot } from "../../bot.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(bot: Bot, guildId: bigint, options: CreateGuildRole, reason?: string) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Role>>(
    "post",
    bot.constants.endpoints.GUILD_ROLES(guildId),
    {
      name: options.name,
      color: options.color,
      hoist: options.hoist,
      mentionable: options.mentionable,
      permissions: bot.utils.calculateBits(options?.permissions || []),
      reason,
    }
  );

  const role = await bot.transformers.role(bot, {
    role: result,
    guildId,
  });

  const guild = await bot.cache.guilds.get(guildId);
  if (guild) {
    guild.roles.set(role.id, role);

    await bot.cache.guilds.set(guildId, guild);
  }

  return role;
}
