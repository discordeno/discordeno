import type { DiscordMemberWithUser } from "../../types/discord.ts";
import type { SearchMembers } from "../../types/discordeno.ts";

import { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Query string to match username(s) and nickname(s) against
 */
export async function searchMembers(
  bot: Bot,
  guildId: bigint,
  query: string,
  options?: Omit<SearchMembers, "query">,
): Promise<Collection<bigint, Member>> {
  if (options?.limit) {
    if (options.limit < 1) throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW);
    if (options.limit > 1000) {
      throw new Error(bot.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH);
    }
  }

  const result = await bot.rest.runMethod<DiscordMemberWithUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBERS_SEARCH(guildId, query, options),
  );

  return new Collection(
    result.map((member) => {
      const m = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user.id));
      return [m.id, m];
    }),
  );
}
