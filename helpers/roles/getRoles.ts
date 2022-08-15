import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";
import { DiscordRole } from "../../types/discord.ts";

/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
export async function getRoles(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordRole[]>(bot.rest, "GET", bot.constants.routes.GUILD_ROLES(guildId));

  const roleStructures = result.map((role) => bot.transformers.role(bot, { role, guildId }));

  return new Collection(roleStructures.map((role) => [role.id, role]));
}
