import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

export async function deleteWebhookMessage(
  webhookID: string,
  webhookToken: string,
  messageID: string,
) {
  const result = await RequestManager.delete(
    endpoints.WEBHOOK_MESSAGE(webhookID, webhookToken, messageID),
  );

  return result;
}
