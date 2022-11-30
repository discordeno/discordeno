import { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Kicks a member from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to kick the member from.
 * @param userId - The user ID of the member to kick from the guild.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * Fires a _Guild Member Remove_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#remove-guild-member}
 */
export async function kickMember(bot: Bot, guildId: BigString, userId: BigString, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.GUILD_MEMBER(guildId, userId),
    {
      reason,
    },
  );
}
