import type { Bot } from "../../bot.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordRole } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of role objects for the guild.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your roles will be cached in your guild.**
 */
export async function getRoles(bot: Bot, guildId: bigint): Promise<Collection<bigint, Role>> {
  const results = await bot.rest.runMethod<DiscordRole[]>(bot.rest, "GET", bot.constants.routes.GUILD_ROLES(guildId));

  return new Collection(
    results.map((result) => {
      const role = bot.transformers.role(bot, { role: result, guildId });
      return [role.id, role];
    }),
  );
}
