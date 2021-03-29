import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

export async function deleteWebhookMessage(
  webhookId: string,
  webhookToken: string,
  messageId: string,
) {
  const result = await RequestManager.delete(
    endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId),
  );

  return result;
}
