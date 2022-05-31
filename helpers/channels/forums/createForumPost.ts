import type { Bot } from "../../../bot.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../../types/mod.ts";
import { Embed } from "../../../transformers/embed.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function createForumPost(
  bot: Bot,
  channelId: bigint,
  options: CreateForumPostWithMessage,
) {
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

export interface CreateForumPostWithMessage extends CreateForumMessage {
  /** 1-100 character thread name */
  name: string;
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080;
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null;
  /** The reason you are creating the thread */
  reason?: string;
}

export interface CreateForumMessage {
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
