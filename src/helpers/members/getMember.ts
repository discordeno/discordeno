import type { GuildMemberWithUser } from "../../types/members/guildMember.ts";
import type { Bot } from "../../bot.ts";

/** Returns a guild member object for the specified user.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMember(bot: Bot, guildId: bigint, id: bigint) {
  const data = await bot.rest.runMethod<GuildMemberWithUser>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_MEMBER(guildId, id),
  );

  return bot.transformers.member(bot, data, guildId, id);
}
