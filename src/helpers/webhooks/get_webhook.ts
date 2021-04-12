import { rest } from "../../rest/rest.ts";
import { Webhook } from "../../types/webhooks/webhook.ts";
import { endpoints } from "../../util/constants.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns the new webhook object for the given id. */
export async function getWebhook(webhookId: string) {
  const result = await rest.runMethod("get", endpoints.WEBHOOK_ID(webhookId));

  return snakeKeysToCamelCase(result) as Webhook;
}
