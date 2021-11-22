import type { Bot } from "../../bot.ts";
import { AllowedMentionsTypes } from "../../types/messages/allowedMentionsTypes.ts";
import type { Message } from "../../types/messages/message.ts";
import type { ExecuteWebhook } from "../../types/webhooks/executeWebhook.ts";

/** Send a webhook with webhook Id and webhook token */
export async function sendWebhook(bot: Bot, webhookId: bigint, webhookToken: string, options: ExecuteWebhook) {
  // DEFAULT TO TRUE
  options.wait = options.wait ?? true;
  
  if (!options.content && !options.file && !options.embeds) {
    throw new Error(bot.constants.Errors.INVALID_WEBHOOK_OPTIONS);
  }

  if (options.content && options.content.length > 2000) {
    throw Error(bot.constants.Errors.MESSAGE_MAX_LENGTH);
  }

  options.embeds?.splice(10);

  if (options.allowedMentions) {
    if (options.allowedMentions.users?.length) {
      if (options.allowedMentions.parse?.includes(AllowedMentionsTypes.UserMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "users");
      }

      if (options.allowedMentions.users.length > 100) {
        options.allowedMentions.users = options.allowedMentions.users.slice(0, 100);
      }
    }

    if (options.allowedMentions.roles?.length) {
      if (options.allowedMentions.parse?.includes(AllowedMentionsTypes.RoleMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "roles");
      }

      if (options.allowedMentions.roles.length > 100) {
        options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100);
      }
    }
  }

  const allowedMentions = options.allowedMentions
    ? {
        parse: options.allowedMentions.parse,
        repliedUser: options.allowedMentions.repliedUser,
        users: options.allowedMentions.users?.map((id) => id.toString()),
        roles: options.allowedMentions.roles?.map((id) => id.toString()),
      }
    : { parse: [] };

  const result = await bot.rest.runMethod<Message>(
    bot.rest,
    "post",
    `${bot.constants.endpoints.WEBHOOK(webhookId, webhookToken)}?wait=${options.wait ?? false}${
      options.threadId ? `&thread_id=${options.threadId}` : ""
    }`,
    {
      wait: options.wait,
      thread_id: options.threadId,
      content: options.content,
      username: options.username,
      avatar_url: options.avatarUrl,
      tts: options.tts,
      file: options.file,
      embeds: options.embeds,
      allowed_mentions: allowedMentions,
    }
  );
  if (!options.wait) return;

  return bot.transformers.message(bot, result);
}
