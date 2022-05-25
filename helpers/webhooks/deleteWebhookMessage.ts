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
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options?.threadId),
  );
}
