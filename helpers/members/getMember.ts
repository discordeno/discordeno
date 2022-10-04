import type { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Gets the member object by user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the member object for.
 * @param userId - The ID of the user to get the member object for.
 * @returns An instance of {@link Member}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
 */
export async function getMember(bot: Bot, guildId: BigString, userId: BigString): Promise<Member> {
  const result = await bot.rest.runMethod<DiscordMemberWithUser>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBER(guildId, userId),
  );

  return bot.transformers.member(bot, result, bot.transformers.snowflake(guildId), bot.transformers.snowflake(userId));
}
