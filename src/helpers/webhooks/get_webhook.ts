import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the new webhook object for the given id. */
export async function getWebhook(webhookID: string) {
  const result = await RequestManager.get(endpoints.WEBHOOK_ID(webhookID));

  return result as WebhookPayload;
}
