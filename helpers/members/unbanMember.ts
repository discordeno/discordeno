import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Unbans a user from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to unban the user in.
 * @param userId - The ID of the user to unban.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Fires a _Guild Ban Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-ban}
 */
export async function unbanMember(bot: Bot, guildId: BigString, userId: BigString): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.GUILD_BAN(guildId, userId));
}
