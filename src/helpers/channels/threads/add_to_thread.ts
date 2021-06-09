import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { botHasChannelPermissions, requireBotChannelPermissions } from "../../../util/permissions.ts";

/** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.
 *  Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event.
 *  @param userId the user to add to the thread defaults to bot
 */
export async function addToThread(channelId: bigint, userId?: bigint) {
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (
      ![ChannelTypes.GuildNewsThread, ChannelTypes.GuildPivateThread, ChannelTypes.GuildPublicThread].includes(
        channel.type
      )
    ) {
      throw new Error(Errors.NOT_A_THREAD_CHANNEL);
    }

    if (!(await botHasChannelPermissions(channel, ["MANAGE_THREADS"])) && !channel.member) {
      throw new Error(Errors.HAVE_TO_BE_PART_OF_THE_THREAD_OR_A_THREAD_MODERATOR_TO_ADD_OTHERS_TO_A_THREAD);
    }
  }

  return await rest.runMethod(
    "put",
    userId ? endpoints.THREAD_USER(channelId, userId) : endpoints.THREAD_ME(channelId)
  );
}
