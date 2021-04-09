import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetches a single channel object from the api.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannel(channelId: string, addToCache = true) {
  const result = (await rest.runMethod(
    "get",
    endpoints.CHANNEL_BASE(channelId),
  )) as DiscordChannel;

  const discordenoChannel = await structures.createDiscordenoChannel(
    result,
    result.guild_id,
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
