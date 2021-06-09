import { botId } from "../../../bot.ts";
import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../util/permissions.ts";

/** Removes another user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event. */
export async function removeFromThread(channelId: bigint, userId?: bigint) {
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (
      ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPivateThread, ChannelTypes.GuildPublicThread].includes(
        channel.type
      )
    ) {
      throw new Error(Errors.NOT_A_THREAD_CHANNEL);
    }

    if (channel.ownerId !== botId && !(await botHasChannelPermissions(channel, ["MANAGE_THREADS"])))
      throw new Error(Errors.HAVE_TO_BE_THE_CREATOR_OF_THE_THREAD_OR_HAVE_MANAGE_THREADS_TO_REMOVE_MEMBERS);
  }

  return await rest.runMethod(
    "delete",
    userId ? endpoints.THREAD_USER(channelId, userId) : endpoints.THREAD_ME(channelId)
  );
}
