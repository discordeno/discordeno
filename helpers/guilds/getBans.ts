import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";
import { DiscordBan } from "../../types/discord.ts";
import { User } from "../../transformers/member.ts";

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(bot: Bot, guildId: bigint, options?: GetBans) {
  const results = await bot.rest.runMethod<DiscordBan[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_BANS(guildId, options),
  );

  return new Collection<bigint, { reason?: string; user: User }>(
    results.map((res) => [
      bot.transformers.snowflake(res.user.id),
      {
        reason: res.reason ?? undefined,
        user: bot.transformers.user(bot, res.user),
      },
    ]),
  );
}

export interface GetBans {
  /** Number of users to return (up to maximum 1000). Default: 1000 */
  limit?: number;
  /** Consider only users before given user id */
  before?: bigint;
  /** Consider only users after given user id */
  after?: bigint;
}
