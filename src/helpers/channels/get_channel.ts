import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetches a single channel object from the api.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannel(channelID: string, addToCache = true) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_BASE(channelID),
  )) as ChannelCreatePayload;

  const channelStruct = await structures.createChannelStruct(
    result,
    result.guild_id,
  );
  if (addToCache) {
    await cacheHandlers.set("channels", channelStruct.id, channelStruct);
  }

  return channelStruct;
}
