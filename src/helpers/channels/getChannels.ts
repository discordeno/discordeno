import type { Channel } from "../../types/channels/channel.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Returns a list of guild channel objects. */
export async function getChannels(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<Channel[]>(bot.rest, "get", bot.constants.endpoints.GUILD_CHANNELS(guildId));

  return new Collection(
    result.map((res) => bot.transformers.channel(bot, { channel: res, guildId })).map((c) => [c.id, c]),
  );
}
