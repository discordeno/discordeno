import type { Bot } from "../../../bot.ts";
import { Channel } from "../../../transformers/channel.ts";
import { DiscordChannel } from "../../../types/discord.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function startThreadWithMessage(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  options: StartThreadWithMessage,
): Promise<Channel> {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.THREAD_START_PUBLIC(channelId, messageId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
    },
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}

export interface StartThreadWithMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The reason you are creating the thread */
  reason?: string;
}
