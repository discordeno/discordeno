import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a list of guild channel objects.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannels(guildID: string, addToCache = true) {
  const result = (await RequestManager.get(
    endpoints.GUILD_CHANNELS(guildID),
  ) as ChannelCreatePayload[]);

  return Promise.all(result.map(async (res) => {
    const channelStruct = await structures.createChannelStruct(res, guildID);
    if (addToCache) {
      await cacheHandlers.set("channels", channelStruct.id, channelStruct);
    }

    return channelStruct;
  }));
}
