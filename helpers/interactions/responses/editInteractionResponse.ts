import type { Bot } from "../../../bot.ts";
import { Message } from "../../../transformers/message.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { MessageComponentTypes } from "../../../types/shared.ts";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.ts";

/** To edit your response to a application command. If a messageId is not provided it will default to editing the original response. */
export async function editInteractionResponse(
  bot: Bot,
  token: string,
  messageId: bigint,
  options: EditWebhookMessage,
): Promise<Message | undefined> {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, messageId),
    {
      messageId,
      ...transformEditInteractionResponse(bot, options),
    },
  );

  return bot.transformers.message(bot, result);
}

export function transformEditInteractionResponse(bot: Bot, options: EditWebhookMessage) {
  return {
    content: options.content,
    embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
    file: options.file,
    allowed_mentions: options.allowedMentions
      ? {
        parse: options.allowedMentions.parse,
        roles: options.allowedMentions.roles?.map((id) => id.toString()),
        users: options.allowedMentions.users?.map((id) => id.toString()),
        replied_user: options.allowedMentions.repliedUser,
      }
      : undefined,
    attachments: options.attachments?.map((attachment) => ({
      id: attachment.id.toString(),
      filename: attachment.filename,
      content_type: attachment.contentType,
      size: attachment.size,
      url: attachment.url,
      proxy_url: attachment.proxyUrl,
      height: attachment.height,
      width: attachment.width,
      ephemeral: attachment.ephemeral,
    })),
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
  };
}
