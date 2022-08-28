import type { Bot } from "../../bot.ts";

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function banMember(bot: Bot, guildId: bigint, id: bigint, options?: CreateGuildBan): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "PUT",
    bot.constants.routes.GUILD_BAN(guildId, id),
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
