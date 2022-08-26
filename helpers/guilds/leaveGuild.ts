import type { Bot } from "../../bot.ts";

/** Leave a guild */
export async function leaveGuild(bot: Bot, guildId: bigint): Promise<void> {
  return void await bot.rest.runMethod(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
