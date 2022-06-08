import type { Bot } from "../../bot.ts";
import { DiscordBan } from "../../types/discord.ts";

/** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
export async function getBan(bot: Bot, guildId: bigint, memberId: bigint) {
  const result = await bot.rest.runMethod<DiscordBan>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_BAN(guildId, memberId),
  );

  return bot.transformers.ban(bot, result);
}
