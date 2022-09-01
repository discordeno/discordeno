import type { Bot } from "../../bot.ts";

/** Leave a guild */
export async function leaveGuild(bot: Bot, guildId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
