import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";

export interface GetWebhookMessageOptions {
  threadId: bigint;
}

/** Returns a previously-sent webhook message from the same token. Returns a message object on success. */
export async function getWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  messageId: bigint,
  options?: GetWebhookMessageOptions
) {
  let url = bot.constants.endpoints.WEBHOOK_MESSAGE_FETCH(webhookId, webhookToken, messageId, { thread_id: options?.threadId.toString() || "" });

  // QUERY PARAMS
  if (options?.threadId) {
    url += `?thread_id=${options.threadId}`;
  }

  const result = await bot.rest.runMethod<Message>(bot.rest, "get", url);

  return bot.transformers.message(bot, result);
}
