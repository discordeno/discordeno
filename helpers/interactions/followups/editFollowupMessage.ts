import { Bot } from "../../../bot.ts";
import { DiscordMessage } from "../../../types/discord.ts";
import { MessageComponentTypes } from "../../../types/shared.ts";
import { EditWebhookMessage } from "../../webhooks/editWebhookMessage.ts";

/** Edits a followup message for an Interaction. Functions the same as edit webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export async function editFollowupMessage(
  bot: Bot,
  interactionToken: string,
  messageId: bigint,
  options: EditWebhookMessage,
) {
  const result = await bot.rest.runMethod<DiscordMessage>(
    bot.rest,
    "patch",
    bot.constants.endpoints.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId),
    {
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
            emoji: component.emoji
              ? {
                id: component.emoji.id?.toString(),
                name: component.emoji.name,
                animated: component.emoji.animated,
              }
              : undefined,
            url: component.url,
            disabled: component.disabled,
          };
        }),
      })),
      message_id: messageId?.toString(),
    },
  );

  return bot.transformers.message(bot, result);
}
