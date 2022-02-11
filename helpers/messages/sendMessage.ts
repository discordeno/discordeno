import type { CreateMessage } from "../../types/messages/createMessage.ts";
import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";
import { MessageComponentTypes } from "../../types/messages/components/messageComponentTypes.ts";

/** Send a message to the channel. Requires SEND_MESSAGES permission. */
export async function sendMessage(bot: Bot, channelId: bigint, content: CreateMessage) {
  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_MESSAGES(channelId),
    {
      content: content.content,
      tts: content.tts,
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
      allowed_mentions: content.allowedMentions
        ? {
          parse: content.allowedMentions?.parse,
          roles: content.allowedMentions?.roles?.map((id) => id.toString()),
          users: content.allowedMentions?.users?.map((id) => id.toString()),
          replied_user: content.allowedMentions?.repliedUser,
        }
        : undefined,
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
      ...(content.messageReference?.messageId
        ? {
          message_reference: {
            message_id: content.messageReference.messageId.toString(),
            channel_id: content.messageReference.channelId?.toString(),
            guild_id: content.messageReference.guildId?.toString(),
            fail_if_not_exists: content.messageReference.failIfNotExists === true,
          },
        }
        : {}),
    },
  );

  return bot.transformers.message(bot, result);
}
