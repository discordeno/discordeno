import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";

// TODO(threads): it seems like the documented return type is wrong
/** Returns array of thread members objects that are members of the thread. */
export async function getThreadMembers(channelId: bigint) {
  // TODO(threads): perm check
  // TODO(threads): intents check
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (
      ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPivateThread, ChannelTypes.GuildPublicThread].includes(
        channel.type
      )
    ) {
      throw new Error(Errors.NOT_A_THREAD_CHANNEL);
    }
  }

  return await rest.runMethod("get", endpoints.THREAD_MEMBERS(channelId));
}
