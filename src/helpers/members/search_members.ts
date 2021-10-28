import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import type { SearchGuildMembers } from "../../types/members/search_guild_members.ts";
import { Collection } from "../../util/collection.ts";
import { Bot } from "../../bot.ts";
import { DiscordenoMember } from "../../transformers/member.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.filter()
 * @param bot
 * @param guildId
 * @param query Query string to match username(s) and nickname(s) against
 * @param options
 */
export async function searchMembers(
  bot: Bot,
  guildId: bigint,
  query: string,
  options?: Omit<SearchGuildMembers, "query"> & { cache?: boolean }
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

  const members = await Promise.all(
    result.map(async (member) => {
      const discordenoMember = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user.id));
      if (options?.cache) {
        await bot.cache.members.set(discordenoMember.id, discordenoMember);
      }

      return discordenoMember;
    })
  );

  return new Collection<bigint, DiscordenoMember>(members.map((member) => [member.id, member]));
}
