import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";
import { DiscordBan } from "../../types/discord.ts";
import { User } from "../../transformers/member.ts";

/** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
export async function getBans(bot: Bot, guildId: bigint) {
  const results = await bot.rest.runMethod<DiscordBan[]>(bot.rest, "get", bot.constants.endpoints.GUILD_BANS(guildId));

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
