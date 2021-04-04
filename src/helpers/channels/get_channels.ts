import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a list of guild channel objects.
 *
 * ⚠️ **If you need this, you are probably doing something wrong. This is not intended for use. Your channels will be cached in your guild.**
 */
export async function getChannels(guildId: string, addToCache = true) {
  const result = (await rest.runMethod(
    "get",
    endpoints.GUILD_CHANNELS(guildId),
  ) as DiscordChannel[]);

  return Promise.all(result.map(async (res) => {
    const channelStruct = await structures.createChannelStruct(res, guildId);
    if (addToCache) {
      await cacheHandlers.set("channels", channelStruct.id, channelStruct);
    }

    return channelStruct;
  }));
}
