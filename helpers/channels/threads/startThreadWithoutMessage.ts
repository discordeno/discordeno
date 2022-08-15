import type { Bot } from "../../../bot.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { ChannelTypes } from "../../../types/shared.ts";

/** Creates a new private thread. Returns a thread channel. */
export async function startThreadWithoutMessage(bot: Bot, channelId: bigint, options: StartThreadWithoutMessage) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.THREAD_START_PRIVATE(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
    },
  );

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}

export interface StartThreadWithoutMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The reason you are creating the thread */
  reason?: string;
  /** the type of thread to create */
  type: ChannelTypes.GuildNewsThread | ChannelTypes.GuildPublicThread | ChannelTypes.GuildPrivateThread;
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
}
