import type { Bot } from "../../bot.ts";

/**
 * Bans a user from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to ban the user from.
 * @param userId - The ID of the user to ban from the guild.
 * @param options - The parameters for the creation of the ban.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Fires a _Guild Ban Add_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild-ban}
 */
export async function banMember(bot: Bot, guildId: bigint, userId: bigint, options?: CreateGuildBan): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_BAN(guildId, userId),
    options
      ? {
        delete_message_days: options.deleteMessageDays,
        reason: options.reason,
      }
      : {},
  );
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan {
  /** Number of days to delete messages for (0-7) */
  deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Reason for the ban */
  reason?: string;
}
