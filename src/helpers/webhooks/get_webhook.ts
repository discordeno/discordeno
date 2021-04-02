import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the new webhook object for the given id. */
export async function getWebhook(webhookId: string) {
  const result = await rest.runMethod("get", endpoints.WEBHOOK_ID(webhookId));

  return result as WebhookPayload;
}
