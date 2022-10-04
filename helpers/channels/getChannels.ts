import type { Bot } from "../../bot.ts";
import { Channel } from "../../transformers/channel.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";

/**
 * Gets the list of channels for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the channels of.
 * @returns A collection of {@link Channel} objects assorted by channel ID.
 *
 * @remarks
 * Excludes threads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
 */
export async function getChannels(bot: Bot, guildId: BigString): Promise<Collection<bigint, Channel>> {
  const results = await bot.rest.runMethod<DiscordChannel[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_CHANNELS(guildId),
  );

  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const channel = bot.transformers.channel(bot, { channel: result, guildId: id });
      return [channel.id, channel];
    }),
  );
}
