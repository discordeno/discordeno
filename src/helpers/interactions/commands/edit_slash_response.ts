import type { DiscordenoEditWebhookMessage } from "../../../types/discordeno/edit_webhook_message.ts";
import type { Bot } from "../../../bot.ts";
import { DiscordAllowedMentionsTypes } from "../../../types/messages/allowed_mentions_types.ts";

/** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
export async function editSlashResponse(bot: Bot, token: string, options: DiscordenoEditWebhookMessage) {
  if (options.content && options.content.length > 2000) {
    throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.components?.length) {
    bot.utils.validateComponents(bot, options.components);
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

  const result = await bot.rest.runMethod(
    bot.rest,
    "patch",
    options.messageId
      ? bot.constants.endpoints.WEBHOOK_MESSAGE(bot.applicationId, token, options.messageId)
      : bot.constants.endpoints.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
    {
      content: options.content,
      embeds: options.embeds,
      file: options.file,
      allowed_mentions: options.allowedMentions
        ? {
            parse: options.allowedMentions.parse,
            roles: options.allowedMentions.roles,
            users: options.allowedMentions.users,
            replied_user: options.allowedMentions.repliedUser,
          }
        : undefined,
      attachments: options.attachments,
      // TODO: Snakelize components??
      components: options.components,
      message_id: options.messageId,
    }
  );

  // If the original message was edited, this will not return a message
  if (!options.messageId) return result as undefined;

  return bot.transformers.message(bot, result);
}
