import type { Bot } from "../../bot.ts";

export interface DeleteWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: bigint;
}

export async function deleteWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  messageId: bigint,
  options?: DeleteWebhookMessageOptions,
) {
  let url = bot.constants.endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId);

  // QUERY PARAMS
  if (options?.threadId) {
    url += `?threadId=${options.threadId}`;
  }
  await bot.rest.runMethod<undefined>(bot.rest, "delete", url);
}
