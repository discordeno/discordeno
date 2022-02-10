import type { Ban } from "../../types/guilds/ban.ts";
import type { Bot } from "../../bot.ts";

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(bot: Bot, guildId: bigint, memberId: bigint) {
  const result = await bot.rest.runMethod<Ban>(bot.rest, "get", bot.constants.endpoints.GUILD_BAN(guildId, memberId));

  return {
    reason: result.reason,
    user: bot.transformers.user(bot, result.user),
  };
}
