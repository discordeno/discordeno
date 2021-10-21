import type { Ban } from "../../types/guilds/ban.ts";
import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(bot: Bot, guildId: bigint) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["BAN_MEMBERS"]);

  const results = await bot.rest.runMethod<Ban[]>(bot.rest,"get", bot.constants.endpoints.GUILD_BANS(guildId));

  return new Collection<bigint, Ban>(results.map((res) => [bot.transformers.snowflake(res.user.id), res]));
}
