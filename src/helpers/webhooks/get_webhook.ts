import type { Webhook } from "../../types/webhooks/webhook.ts";
import type {Bot} from "../../bot.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Returns the new webhook object for the given id. */
export async function getWebhook(bot: Bot, webhookId: bigint) {
  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<Webhook>>(bot.rest, "get", bot.constants.endpoints.WEBHOOK_ID(webhookId));
}
