import type { Bot } from "../../bot.ts";
import { ExecuteWebhook } from "../../types/discordeno.ts";
import type { Message } from "../../types/messages/message.ts";

/** Send a webhook with webhook Id and webhook token */
export async function sendWebhook(bot: Bot, webhookId: bigint, webhookToken: string, options: ExecuteWebhook) {
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
      component: options.components,
    },
  );
  if (!options.wait) return;

  return bot.transformers.message(bot, result);
}
