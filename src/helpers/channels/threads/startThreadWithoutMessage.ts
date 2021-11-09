import type { Channel } from "../../../types/channels/channel.ts";
import type { StartThreadWithoutMessage } from "../../../types/channels/threads/start_thread.ts";
import type { Bot } from "../../../bot.ts";

/** Creates a new private thread. Returns a thread channel. */
export async function startThreadWithoutMessage(bot: Bot, channelId: bigint, options: StartThreadWithoutMessage) {
  return await bot.rest.runMethod<Channel>(bot.rest, "post", bot.constants.endpoints.THREAD_START_PRIVATE(channelId), {
    name: options.name,
    auto_archive_duration: options.autoArchiveDuration,
  });
}
