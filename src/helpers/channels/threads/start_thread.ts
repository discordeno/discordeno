import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { ChannelTypes } from "../../../types/channels/channel_types.ts";
import { StartThread } from "../../../types/channels/threads/start_thread.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize } from "../../../util/utils.ts";

/**
 * Creates a new public thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event.
 * @param messageId when provided the thread will be public
 */
export async function startThread(channelId: bigint, options: StartThread & { messageId?: bigint }) {
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    // TODO(threads): perm check
    if (![ChannelTypes.GuildText, ChannelTypes.GuildNews].includes(channel.type)) {
      throw new Error(Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);
    }

    if (!options.messageId && channel.type === ChannelTypes.GuildNews) {
      throw new Error(Errors.GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS);
    }
  }

  return await rest.runMethod(
    "post",
    options?.messageId
      ? endpoints.THREAD_START_PUBLIC(channelId, options.messageId)
      : endpoints.THREAD_START_PRIVATE(channelId),
    snakelize(options)
  );
}
