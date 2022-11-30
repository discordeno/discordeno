import type { Bot } from "../../../bot.ts";
import { WithReason } from "../../../mod.ts";
import { Channel } from "../../../transformers/channel.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { BigString, ChannelTypes } from "../../../types/shared.ts";

/**
 * Creates a thread without using a message as the thread's point of origin.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel in which to create the thread.
 * @param options - The parameters to use for the creation of the thread.
 * @returns An instance of the created {@link Channel | Thread}.
 *
 * @remarks
 * Creating a private thread requires the server to be boosted.
 *
 * Fires a _Thread Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-without-message}
 */
export async function startThreadWithoutMessage(
  bot: Bot,
  channelId: BigString,
  options: StartThreadWithoutMessage,
): Promise<Channel> {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.THREAD_START_PRIVATE(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
      rate_limit_per_user: options.rateLimitPerUser,
      type: options.type,
      invitable: options.invitable,
      reason: options.reason,
    },
  );

  return bot.transformers.channel(bot, {
    channel: result,
    guildId: result.guild_id ? bot.transformers.snowflake(result.guild_id) : undefined,
  });
}

export interface StartThreadWithoutMessage extends WithReason {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** the type of thread to create */
  type: ChannelTypes.AnnouncementThread | ChannelTypes.PublicThread | ChannelTypes.PrivateThread;
  /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
  invitable?: boolean;
}
