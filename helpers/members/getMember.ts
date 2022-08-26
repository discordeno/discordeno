import type { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";

/** Returns a guild member object for the specified user. */
export async function getMember(bot: Bot, guildId: bigint, id: bigint): Promise<Member> {
  const data = await bot.rest.runMethod<DiscordMemberWithUser>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBER(guildId, id),
  );

  return bot.transformers.member(bot, data, guildId, id);
}
