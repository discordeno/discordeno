import type { Bot } from "../../bot.ts";

export async function deleteWebhookMessage(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  messageId: bigint,
  options?: DeleteWebhookMessageOptions,
): Promise<void> {
  return void await bot.rest.runMethod(
    bot.rest,
    "DELETE",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options),
  );
}

export interface DeleteWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: bigint;
}
