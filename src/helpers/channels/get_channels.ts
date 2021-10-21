import type { Channel } from "../../types/channels/channel.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Returns a list of guild channel objects.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannels(bot: Bot, guildId: bigint, addToCache = true) {
  const result = await bot.rest.runMethod<Channel[]>(bot.rest,"get", bot.constants.endpoints.GUILD_CHANNELS(guildId));

  return new Collection(
    (
      await Promise.all(
        result.map(async (res) => {
          const discordenoChannel = await bot.transformers.channel({channel: res, guildId});
          if (addToCache) {
            await bot.cache.channels.set(discordenoChannel.id, discordenoChannel);
          }

          return discordenoChannel;
        })
      )
    ).map((c) => [c.id, c])
  );
}
