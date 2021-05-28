import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
//TODO(threads): this does not work rn
/** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event.
 * @param userId the user to add to the thread defaults to bot
 */
export async function addToThread(channelId: bigint, userId?: bigint) {
  // TODO(threads): perm check
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

  return await rest.runMethod(
    "put",
    userId ? endpoints.THREAD_USER(channelId, userId) : endpoints.THREAD_ME(channelId)
  );
}
