import type { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { DiscordMessage } from "../../types/discord.ts";
import { AllowedMentions, FileContent, MessageComponents } from "../../types/discordeno.ts";
import { MessageComponentTypes } from "../../types/shared.ts";

/** Edit the message. */
export async function editMessage(bot: Bot, channelId: bigint, messageId: bigint, content: EditMessage) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "patch",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    {
      content: content.content,
      embeds: content.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
      allowed_mentions: {
        parse: content.allowedMentions?.parse,
        roles: content.allowedMentions?.roles?.map((id) => id.toString()),
        users: content.allowedMentions?.users?.map((id) => id.toString()),
        replied_user: content.allowedMentions?.repliedUser,
      },
      attachments: content.attachments?.map((attachment) => ({
        id: attachment.id.toString(),
        filename: attachment.filename,
        content_type: attachment.contentType,
        size: attachment.size,
        url: attachment.url,
        proxy_url: attachment.proxyUrl,
        height: attachment.height,
        width: attachment.width,
      })),
      file: content.file,
      components: content.components?.map((component) => ({
        type: component.type,
        components: component.components.map((component) => {
          if (component.type === MessageComponentTypes.InputText) {
            return {
              type: component.type,
              style: component.style,
              custom_id: component.customId,
              label: component.label,
              placeholder: component.placeholder,
              min_length: component.minLength ?? component.required === false ? 0 : component.minLength,
              max_length: component.maxLength,
            };
          }

          if (component.type === MessageComponentTypes.SelectMenu) {
            return {
              type: component.type,
              custom_id: component.customId,
              placeholder: component.placeholder,
              min_values: component.minValues,
              max_values: component.maxValues,
              options: component.options.map((option) => ({
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
            type: component.type,
            custom_id: component.customId,
            label: component.label,
            style: component.style,
            emoji: "emoji" in component && component.emoji
              ? {
                id: component.emoji.id?.toString(),
                name: component.emoji.name,
                animated: component.emoji.animated,
              }
              : undefined,
            url: "url" in component ? component.url : undefined,
            disabled: "disabled" in component ? component.disabled : undefined,
          };
        }),
      })),
    },
  );

  return bot.transformers.message(bot, result);
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessage {
  /** The new message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[] | null;
  /** Edit the flags of the message (only `SUPPRESS_EMBEDS` can currently be set/unset) */
  flags?: 4 | null;
  /** The contents of the file being sent/edited */
  file?: FileContent | FileContent[] | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /** When specified (adding new attachments), attachments which are not provided in this list will be removed. */
  attachments?: Attachment[];
  /** The components you would like to have sent in this message */
  components?: MessageComponents;
}
