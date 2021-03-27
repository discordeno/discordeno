import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  webhookId: string,
  webhookToken: string,
  options: Omit<WebhookEditOptions, "channelId">,
) {
  const result = await RequestManager.patch(
    endpoints.WEBHOOK(webhookId, webhookToken),
    options,
  );

  return result as WebhookPayload;
}
