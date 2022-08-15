import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";

/**
 * This function fetches a guild's data. This is not the same data as a GUILD_CREATE.
 * So it does not cache the guild, you must do it manually.
 */
export async function getGuild(
  bot: Bot,
  guildId: bigint,
  options: { counts?: boolean } = {
    counts: true,
  },
) {
  const result = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD(guildId, options.counts),
  );

  // Sometimes the guild is not found, so we need to check for it.
  if (!result.id) return;

  return bot.transformers.guild(bot, {
    guild: result,
    shardId: bot.utils.calculateShardId(bot.gateway, guildId),
  });
}
