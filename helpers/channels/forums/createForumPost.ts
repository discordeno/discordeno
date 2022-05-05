import type { Bot } from "../../../bot.ts";
import { DiscordChannel } from "../../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../../types/mod.ts";
import { Embed } from "../../../transformers/embed.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { MessageComponentTypes } from "../../../types/shared.ts";

/** Creates a new public thread from an existing message. Returns a thread channel. */
export async function createForumPost(
  bot: Bot,
  channelId: bigint,
  options: createForumPostWithMessage,
) {
  const result = await bot.rest.runMethod<DiscordChannel>(
    bot.rest,
    "post",
    bot.constants.endpoints.FORUM_START(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
      rate_limit_per_user: options.rateLimitPerUser,

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
      components: options.components?.map((component) => ({
        type: component.type,
        components: component.components.map((subComponent) => {
          if (subComponent.type === MessageComponentTypes.InputText) {
            return {
              type: subComponent.type,
              style: subComponent.style,
              custom_id: subComponent.customId,
              label: subComponent.label,
              placeholder: subComponent.placeholder,
              min_length: subComponent.minLength ?? subComponent.required === false ? 0 : subComponent.minLength,
              max_length: subComponent.maxLength,
            };
          }

          if (subComponent.type === MessageComponentTypes.SelectMenu) {
            return {
              type: subComponent.type,
              custom_id: subComponent.customId,
              placeholder: subComponent.placeholder,
              min_values: subComponent.minValues,
              max_values: subComponent.maxValues,
              options: subComponent.options.map((option) => ({
                label: option.label,
                value: option.value,
                description: option.description,
                emoji: option.emoji
                  ? {
                    id: option.emoji.id?.toString(),
                    name: option.emoji.name,
                    animated: option.emoji.animated,
                  }
                  : undefined,
                default: option.default,
              })),
            };
          }

          return {
            type: subComponent.type,
            custom_id: subComponent.customId,
            label: subComponent.label,
            style: subComponent.style,
            emoji: "emoji" in subComponent && subComponent.emoji
              ? {
                id: subComponent.emoji.id?.toString(),
                name: subComponent.emoji.name,
                animated: subComponent.emoji.animated,
              }
              : undefined,
            url: "url" in subComponent ? subComponent.url : undefined,
            disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
          };
        }),
      })),
    }
  );

  return bot.transformers.channel(bot, { channel: result, guildId: bot.transformers.snowflake(result.guild_id!) });
}

export interface createForumPostWithMessage extends CreateForumMessage {
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
