import type { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";

/** Fetches a single channel object from the api. */
export async function getChannel(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL(channelId),
  );

  // IF A CHANNEL DOESN'T EXIST, DISCORD RETURNS `{}`
  return result.id
    ? bot.transformers.channel(bot, {
      channel: result,
      guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
    })
    : undefined;
}
