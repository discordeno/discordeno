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
    "PATCH",
    bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId),
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
            emoji: subComponent.emoji
              ? {
                id: subComponent.emoji.id?.toString(),
                name: subComponent.emoji.name,
                animated: subComponent.emoji.animated,
              }
              : undefined,
            url: subComponent.url,
            disabled: subComponent.disabled,
          };
        }),
      })),
      message_id: messageId?.toString(),
    },
  );

  return bot.transformers.message(bot, result);
}
