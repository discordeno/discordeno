import type { Message } from "../../types/messages/message.ts";
import type { EditWebhookMessage } from "../../types/webhooks/edit_webhook_message.ts";
import type { Bot } from "../../bot.ts";
import { DiscordAllowedMentionsTypes } from "../../types/messages/allowed_mentions_types.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function editWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  options: EditWebhookMessage & { messageId?: bigint }
) {
  if (options.content && options.content.length > 2000) {
    throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowedMentions) {
    if (options.allowedMentions.users?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.UserMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "users");
      }

      if (options.allowedMentions.users.length > 100) {
        options.allowedMentions.users = options.allowedMentions.users.slice(0, 100);
      }
    }

    if (options.allowedMentions.roles?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.RoleMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "roles");
      }

      if (options.allowedMentions.roles.length > 100) {
        options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100);
      }
    }
  }

  if (options.components?.length) {
    bot.utils.validateComponents(options.components);
  }

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(
    bot.rest,
    "patch",
    options.messageId
      ? bot.constants.endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, options.messageId)
      : bot.constants.endpoints.WEBHOOK_MESSAGE_ORIGINAL(webhookId, webhookToken),
    {
      content: options.content,
      embeds: options.embeds,
      file: options.file,
      allowed_mentions: {
        parse: content.allowedMentions.parse,
        roles: content.allowedMentions.roles,
        users: content.allowedMentions.users,
        replied_user: content.allowedMentions.repliedUser,
      },
      attachments: options.attachments,
      // TODO: Snakelize components??
      components: options.components,
      message_id: options.messageId,
    }
  );

  return bot.transformers.message(bot, result);
}
