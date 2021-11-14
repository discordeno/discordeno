import type { CreateGuildBan } from "../../types/guilds/create_guild_ban.ts";
import type { Bot } from "../../bot.ts";

/** Ban a user from the guild and optionally delete previous messages sent by the user. Requires the BAN_MEMBERS permission. */
export async function banMember(bot: Bot, guildId: bigint, id: bigint, options?: CreateGuildBan) {
  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.endpoints.GUILD_BAN(guildId, id),
    options
      ? {
          delete_message_days: options.deleteMessageDays,
          reason: options.reason,
        }
      : {}
  );
}
