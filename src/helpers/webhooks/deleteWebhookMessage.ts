import type { Bot } from "../../bot.ts";

export async function deleteWebhookMessage(bot: Bot, webhookId: bigint, webhookToken: string, messageId: bigint) {
  return await bot.rest.runMethod<undefined>(
    bot.rest,
    "delete",
    bot.constants.endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId)
  );
}
