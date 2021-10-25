import type { Channel } from "../../../types/channels/channel.ts";
import type { StartThread } from "../../../types/channels/threads/start_thread.ts";
import type { Bot } from "../../../bot.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function startThread(bot: Bot, channelId: bigint, messageId: bigint, options: StartThread) {
  // const channel = await bot.cache.channels.get(channelId);
  // if (channel) {
  //   if (!channel.isGuildTextBasedChannel) {
  //     throw new Error(bot.constants.Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);
  //   }

  //   await bot.utils.requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES", "USE_PUBLIC_THREADS"]);
  // }

  // return channelToThread(
  //   await bot.rest.runMethod<Channel>(
  //     bot.rest,
  //     "post",
  //     bot.constants.endpoints.THREAD_START_PUBLIC(channelId, messageId),
  //     {
  //       name: options.name,
  //       auto_archive_duration: options.autoArchiveDuration,
  //     }
  //   )
  // );
}
