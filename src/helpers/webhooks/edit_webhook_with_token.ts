import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  webhookID: string,
  webhookToken: string,
  options: Omit<WebhookEditOptions, "channelID">,
) {
  const result = await RequestManager.patch(
    endpoints.WEBHOOK(webhookID, webhookToken),
    options,
  );

  return result as WebhookPayload;
}
