import type { Bot } from "../../../bot.ts";
import { Channel } from "../../../transformers/channel.ts";
import { Embed } from "../../../transformers/embed.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { AllowedMentions, BigString, FileContent, MessageComponents, WithReason } from "../../../types/mod.ts";

/**
 * Creates a new thread in a forum channel, and sends a message within the created thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the forum channel to create the thread within.
 * @param options - The parameters for the creation of the thread.
 * @returns An instance of {@link Channel} with a nested {@link Message} object.
 *
 * @remarks
 * Requires the `CREATE_MESSAGES` permission.
 *
 * Fires a _Thread Create_ gateway event.
 * Fires a _Message Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
 *
 * @experimental
 */
export async function createForumThread(
  bot: Bot,
  channelId: BigString,
  options: CreateForumPostWithMessage,
): Promise<Channel> {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "POST",
    bot.constants.routes.FORUM_START(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
      rate_limit_per_user: options.rateLimitPerUser,
      reason: options.reason,

      content: options.content,
      embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: options.allowedMentions
        ? {
          parse: options.allowedMentions?.parse,
          roles: options.allowedMentions?.roles?.map((id) => id.toString()),
          users: options.allowedMentions?.users?.map((id) => id.toString()),
          replied_user: options.allowedMentions?.repliedUser,
        }
        : undefined,
      file: options.file,
      components: options.components?.map((component) => bot.transformers.reverse.component(bot, component)),
    },
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}

export interface CreateForumPostWithMessage extends WithReason {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** The contents of the file being sent */
  file?: FileContent | FileContent[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
