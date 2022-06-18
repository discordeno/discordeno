import { Bot } from "../../bot.ts";

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(bot: Bot, webhookId: bigint, reason?: string) {
  await bot.rest.runMethod<undefined>(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_ID(webhookId), { reason });
}
