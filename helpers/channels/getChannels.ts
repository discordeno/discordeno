import type { Bot } from "../../bot.ts";
import { Channel } from "../../transformers/channel.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of guild channel objects. */
export async function getChannels(bot: Bot, guildId: bigint): Promise<Collection<bigint, Channel>> {
  const results = await bot.rest.runMethod<DiscordChannel[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_CHANNELS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const channel = bot.transformers.channel(bot, { channel: result, guildId });
      return [channel.id, channel];
    }),
  );
}
