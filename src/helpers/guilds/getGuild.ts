import type { Guild } from "../../types/guilds/guild.ts";
import type { Bot } from "../../bot.ts";

/**
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 * */
export async function getGuild(
  bot: Bot,
  guildId: bigint,
  options: { counts?: boolean } = {
    counts: true,
  }
) {
  const result = await bot.rest.runMethod<Guild>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_FETCH(guildId, { counts: !!options.counts })
  );

  return bot.transformers.guild(bot, {
    guild: result,
    shardId: bot.utils.calculateShardId(bot.gateway, guildId),
  });
}
