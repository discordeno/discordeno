import type { DiscordMemberWithUser } from "../../types/discord.ts";
import type { SearchMembers } from "../../types/discordeno.ts";

import { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { Collection } from "../../util/collection.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Gets the list of members whose usernames or nicknames start with a provided string.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to search in.
 * @param query - The string to match usernames or nicknames against.
 * @param options - The parameters for searching through the members.
 * @returns A collection of {@link Member} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
 */
export async function searchMembers(
  bot: Bot,
  guildId: BigString,
  query: string,
  options?: Omit<SearchMembers, "query">,
): Promise<Collection<bigint, Member>> {
  if (options?.limit) {
    if (options.limit < 1) throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW);
    if (options.limit > 1000) {
      throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH);
    }
  }

  const results = await bot.rest.runMethod<DiscordMemberWithUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBERS_SEARCH(guildId, query, options),
  );

  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const member = bot.transformers.member(bot, result, id, bot.transformers.snowflake(result.user.id));
      return [member.id, member];
    }),
  );
}
