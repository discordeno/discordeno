import { Bot } from "../../../bot.ts";
import { AllowedMentionsTypes } from "../../../types/messages/allowedMentionsTypes.ts";
import { MessageComponentTypes } from "../../../types/messages/components/messageComponentTypes.ts";
import { Message } from "../../../types/messages/message.ts";
import { EditWebhookMessage } from "../../../types/webhooks/editWebhookMessage.ts";

/** Edits a followup message for an Interaction. Functions the same as edit webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export async function editFollowupMessage(
  bot: Bot,
  interactionToken: string,
  messageId: bigint,
  options: EditWebhookMessage,
) {
  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "patch",
    bot.constants.endpoints.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId),
    {
      content: options.content,
      embeds: options.embeds,
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
            emoji: subcomponent.emoji
              ? {
                id: subcomponent.emoji.id?.toString(),
                name: subcomponent.emoji.name,
                animated: subcomponent.emoji.animated,
              }
              : undefined,
            url: subcomponent.url,
            disabled: subcomponent.disabled,
          };
        }),
      })),
      message_id: messageId?.toString(),
    },
  );

  return bot.transformers.message(bot, result);
}
