import type { Bot } from "../../bot.ts";

/**
 * Leaves a guild.
 *
 * @param bot - The bot instance used to make the request
 * @param guildId - The ID of the guild to leave.
 *
 * @see {@link https://discord.com/developers/docs/resources/user#leave-guild}
 */
export async function leaveGuild(bot: Bot, guildId: bigint): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_LEAVE(guildId));
}
