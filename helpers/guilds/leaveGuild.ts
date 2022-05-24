import type { Bot } from "../../bot.ts";

/** Leave a guild */
export async function leaveGuild(bot: Bot, guildId: bigint) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.endpoints.GUILD_LEAVE(guildId));
}
