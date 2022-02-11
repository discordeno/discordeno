import type { EditMessage } from "../../types/messages/editMessage.ts";
import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";
import { MessageComponentTypes } from "../../types/messages/components/messageComponentTypes.ts";

/** Edit the message. */
export async function editMessage(bot: Bot, channelId: bigint, messageId: bigint, content: EditMessage) {
  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "patch",
    bot.constants.endpoints.CHANNEL_MESSAGE(channelId, messageId),
    {
      content: content.content,
      embeds: content.embeds?.map((embed) => ({
        title: embed.title,
        type: embed.type,
        description: embed.description,
        url: embed.url,
        timestamp: embed.timestamp,
        color: embed.color,
        footer: embed.footer
          ? {
            text: embed.footer.text,
            icon_url: embed.footer.iconUrl,
            proxy_icon_url: embed.footer.proxyIconUrl,
          }
          : undefined,
        image: embed.image
          ? {
            url: embed.image.url,
            proxy_url: embed.image.proxyUrl,
            height: embed.image.height,
            width: embed.image.width,
          }
          : undefined,
        thumbnail: embed.thumbnail
          ? {
            url: embed.thumbnail.url,
            proxy_url: embed.thumbnail.proxyUrl,
            height: embed.thumbnail.height,
            width: embed.thumbnail.width,
          }
          : undefined,
        video: embed.video
          ? {
            url: embed.video.url,
            proxy_url: embed.video.proxyUrl,
            height: embed.video.height,
            width: embed.video.width,
          }
          : undefined,
        provider: embed.provider,
        author: embed.author
          ? {
            name: embed.author.name,
            url: embed.author.url,
            icon_url: embed.author.iconUrl,
            proxy_icon_url: embed.author.proxyIconUrl,
          }
          : undefined,
        fields: embed.fields,
      })),
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
        components: component.components.map((subcomponent) => {
          if (subcomponent.type === MessageComponentTypes.InputText) {
            return {
              type: subcomponent.type,
              style: subcomponent.style,
              custom_id: subcomponent.customId,
              label: subcomponent.label,
              placeholder: subcomponent.placeholder,
              min_length: subcomponent.minLength ?? subcomponent.required === false ? 0 : subcomponent.minLength,
              max_length: subcomponent.maxLength,
            };
          }

          if (subcomponent.type === MessageComponentTypes.SelectMenu) {
            return {
              type: subcomponent.type,
              custom_id: subcomponent.customId,
              placeholder: subcomponent.placeholder,
              min_values: subcomponent.minValues,
              max_values: subcomponent.maxValues,
              options: subcomponent.options.map((option) => ({
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
            type: subcomponent.type,
            custom_id: subcomponent.customId,
            label: subcomponent.label,
            style: subcomponent.style,
            emoji: "emoji" in subcomponent && subcomponent.emoji
              ? {
                id: subcomponent.emoji.id?.toString(),
                name: subcomponent.emoji.name,
                animated: subcomponent.emoji.animated,
              }
              : undefined,
            url: "url" in subcomponent ? subcomponent.url : undefined,
            disabled: "disabled" in subcomponent ? subcomponent.disabled : undefined,
          };
        }),
      })),
    },
  );

  return bot.transformers.message(bot, result);
}
