import type { Webhook } from "../../types/webhooks/webhook.ts";
import type {Bot} from "../../bot.ts";

/** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
export async function getWebhookWithToken(bot: Bot, webhookId: bigint, token: string) {
  return await bot.rest.runMethod<Webhook>(bot.rest,"get", bot.constants.endpoints.WEBHOOK(webhookId, token));
}
