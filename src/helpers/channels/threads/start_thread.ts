import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { StartThread } from "../../../types/channels/threads/start_thread.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";
import { snakelize } from "../../../util/utils.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function startThread(channelId: bigint, options: StartThread & { messageId: bigint }) {
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (!channel.isGuildTextBasedChannel) {
      throw new Error(Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);
    }

    await requireBotChannelPermissions(channel, ["USE_PUBLIC_THREADS"]);
  }

  return await rest.runMethod(
    "post",
    endpoints.THREAD_START_PUBLIC(channelId, options.messageId),
    snakelize(options)
  );
}
