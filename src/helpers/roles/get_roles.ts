import type { Role } from "../../types/permissions/role.ts";
import {Bot} from "../../bot.ts";
import {Collection} from "../../util/collection.ts";
import {DiscordenoRole} from "../../transformers/role.ts";
/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
export async function getRoles(bot: Bot, guildId: bigint, addToCache = true) {
  await bot.utils.requireBotGuildPermissions(bot,guildId, ["MANAGE_ROLES"]);

  const result = await bot.rest.runMethod<Role[]>(bot.rest,"get", bot.constants.endpoints.GUILD_ROLES(guildId));

  const roleStructures = result.map((role: Role) => bot.transformers.role({ role, guildId }));

  const roles = new Collection(roleStructures.map((role: DiscordenoRole) => [role.id, role]));

  if (addToCache) {
    const guild = await bot.cache.guilds.get(guildId);
    if (guild) {
      guild.roles = roles;
      await bot.cache.guilds.set(guild.id, guild);
    }
  }

  return roleStructures;
}
