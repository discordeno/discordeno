import type { Channel } from "../../../types/channels/channel.ts";
import type { StartThreadWithMessage } from "../../../types/channels/threads/startThread.ts";
import type { Bot } from "../../../bot.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function startThreadWithMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  options: StartThreadWithMessage
) {
  const result = await bot.rest.runMethod<Channel>(
    bot.rest,
    "post",
    bot.constants.endpoints.THREAD_START_PUBLIC(channelId, messageId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
    }
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}
