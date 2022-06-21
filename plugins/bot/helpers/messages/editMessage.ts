import { Bot } from "../../bot.ts";
import { Attachment } from "../../transformers/attachment.ts";
import { Embed } from "../../transformers/embed.ts";
import { DiscordMessage, FileContent, MessageComponentTypes } from "../../deps.ts";
import { AllowedMentions, MessageComponents } from "../../typings.ts";

/** Edit the message. */
export async function editMessage(bot: Bot, channelId: bigint, messageId: bigint, content: EditMessage) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
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
              disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
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
