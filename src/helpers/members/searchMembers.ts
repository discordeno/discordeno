import type { GuildMemberWithUser } from "../../types/members/guildMember.ts";
import type { SearchGuildMembers } from "../../types/members/searchGuildMembers.ts";
import { Collection } from "../../util/collection.ts";
import { Bot } from "../../bot.ts";

/**
 * Query string to match username(s) and nickname(s) against
 */
export async function searchMembers(
  bot: Bot,
  guildId: bigint,
  query: string,
  options?: Omit<SearchGuildMembers, "query">
) {
  if (options?.limit) {
    if (options.limit < 1) throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW);
    if (options.limit > 1000) {
      throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH);
    }
  }

  const result = await bot.rest.runMethod<GuildMemberWithUser[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_MEMBERS_SEARCH(guildId),
    {
      ...options,
      query,
    }
  );

  return new Collection(
    result.map((member) => {
      const m = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user.id));
      return [m.id, m];
    })
  );
}
