import type { Guild } from "../../types/guilds/guild.ts";
import type { Bot } from "../../bot.ts";

/**
 * ⚠️ **If you need this, you are probably doing something wrong. Always use cache.guilds.get()
 *
 * Advanced Devs:
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 * */
export async function getGuild(
  bot: Bot,
  guildId: bigint,
  options: { counts?: boolean; addToCache?: boolean } = {
    counts: true,
    addToCache: true,
  }
) {
  const result = await bot.rest.runMethod<Guild>(bot.rest, "get", bot.constants.endpoints.GUILDS_BASE(guildId), {
    with_counts: options.counts,
  });

  const guild = await bot.transformers.guild(bot, {
    guild: result,
    shardId: Number((BigInt(guildId) >> 22n) % BigInt(ws.botGatewayData.shards)),
  });

  if (options.addToCache) {
    await bot.cache.guilds.set(guild.id, guild);
  }

  return guild;
}
