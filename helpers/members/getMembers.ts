import type { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

// TODO: make options optional
/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(
  bot: Bot,
  guildId: bigint,
  options: ListGuildMembers,
): Promise<Collection<bigint, Member>> {
  const results = await bot.rest.runMethod<DiscordMemberWithUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBERS(guildId, options),
  );

  return new Collection(
    results.map((result) => {
      const member = bot.transformers.member(bot, result, guildId, bot.transformers.snowflake(result.user.id));
      return [member.id, member];
    }),
  );
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1000 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}
