import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { Channel } from "../../types/channels/channel.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetches a single channel object from the api.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannel(channelId: string, addToCache = true) {
  const result = await rest.runMethod<Channel>(
    "get",
    endpoints.CHANNEL_BASE(channelId),
  );

  const discordenoChannel = await structures.createDiscordenoChannel(
    result,
    result.guildId,
  );
  if (addToCache) {
    await cacheHandlers.set(
      "channels",
      discordenoChannel.id,
      discordenoChannel,
    );
  }

  return discordenoChannel;
}
