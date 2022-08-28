import type { Bot } from "../../bot.ts";

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(bot: Bot, webhookId: bigint, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_ID(webhookId), { reason });
}
