import type { Bot } from "../../bot.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(bot: Bot, guildId: bigint, options: ListGuildMembers) {
  let url = `${bot.constants.endpoints.GUILD_MEMBERS(guildId)}?limit=${options.limit || 1000}`;

  if (options.after) url += `&after=${options.after}`;

  const result = await bot.rest.runMethod<DiscordMemberWithUser[]>(
    bot.rest,
    "GET",
    url,
  );

  return new Collection(
    result.map((res) => {
      const member = bot.transformers.member(bot, res, guildId, bot.transformers.snowflake(res.user.id));
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
