import type { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";

/** Fetches a single channel object from the api. */
export async function getChannel(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_BASE(channelId),
  );

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}
