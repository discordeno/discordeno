import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
export async function getWebhookWithToken(webhookId: string, token: string) {
  const result = await RequestManager.get(endpoints.WEBHOOK(webhookId, token));

  return result as WebhookPayload;
}
