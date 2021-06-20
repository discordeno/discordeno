import { cacheHandlers } from "../../../cache.ts";
import { rest } from "../../../rest/rest.ts";
import { Channel } from "../../../types/channels/channel.ts";
import { StartThread } from "../../../types/channels/threads/start_thread.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";
import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";
import { snakelize } from "../../../util/utils.ts";

/** Creates a new private thread. Returns a thread channel. */
export async function startPrivateThread(channelId: bigint, options: StartThread) {
  const channel = await cacheHandlers.get("channels", channelId);
  if (channel) {
    if (!channel.isGuildTextBasedChannel) throw new Error(Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);

    if (channel.isNewsChannel) throw new Error(Errors.GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS);

    await requireBotChannelPermissions(channel, ["SEND_MESSAGES", "USE_PRIVATE_THREADS"]);
  }

  return channelToThread(
    await rest.runMethod<Channel>("post", endpoints.THREAD_START_PRIVATE(channelId), snakelize(options))
  );
}
