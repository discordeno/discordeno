import type { GuildMemberWithUser } from "../../types/members/guildMember.ts";
import type { ListGuildMembers } from "../../types/members/listGuildMembers.ts";
import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";
import type { DiscordenoMember } from "../../transformers/member.ts";

/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(bot: Bot, guildId: bigint, options: ListGuildMembers & { memberCount: number }) {
  const result = await bot.rest.runMethod<GuildMemberWithUser[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_MEMBERS(guildId),
    {
      limit: options?.limit ?? options.memberCount,
      after: options?.after,
    }
  );

  return new Collection(
    result.map((res) => {
      const member = bot.transformers.member(bot, res, guildId, bot.transformers.snowflake(res.user.id));
      return [member.id, member];
    })
  );
}
