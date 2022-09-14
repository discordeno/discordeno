import type { Bot } from "../../bot.ts";
import { BigString, WithReason } from "../../mod.ts";

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
export async function banMember(
  bot: Bot,
  guildId: BigString,
  userId: BigString,
  options?: CreateGuildBan,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_BAN(guildId, userId),
    {
      delete_message_seconds: options?.deleteMessageSeconds,
      reason: options?.reason,
    },
  );
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban */
export interface CreateGuildBan extends WithReason {
  /** Number of seconds to delete messages for, between 0 and 604800 (7 days) */
  deleteMessageSeconds?: number;
}
