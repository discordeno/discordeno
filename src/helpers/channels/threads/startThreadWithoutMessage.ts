import type { Channel } from "../../../types/channels/channel.ts";
import type { StartThreadWithoutMessage } from "../../../types/channels/threads/start_thread.ts";
import type { Bot } from "../../../bot.ts";

/** Creates a new private thread. Returns a thread channel. */
export async function startThreadWithoutMessage(bot: Bot, channelId: bigint, options: StartThreadWithoutMessage) {
  // const channel = await bot.cache.channels.get(channelId);
  // if (channel) {
  //   if (!channel.isGuildTextBasedChannel) throw new Error(bot.constants.Errors.INVALID_THREAD_PARENT_CHANNEL_TYPE);
  //   if (channel.isNewsChannel) throw new Error(bot.constants.Errors.GUILD_NEWS_CHANNEL_ONLY_SUPPORT_PUBLIC_THREADS);
  //   await bot.utils.requireBotChannelPermissions(bot, channel, ["SEND_MESSAGES", "USE_PRIVATE_THREADS"]);
  // }
  // if (options.invitable && options.type !== PRIVATETHREAD) throw new Error("Invitiable option requires private threads.");
  // return channelToThread(
  //   await bot.rest.runMethod<Channel>(bot.rest, "post", bot.constants.endpoints.THREAD_START_PRIVATE(channelId), {
  //     name: options.name,
  //     auto_archive_duration: options.autoArchiveDuration,
  //   })
  // );
}
