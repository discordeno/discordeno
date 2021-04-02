import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

export async function deleteWebhookMessage(
  webhookId: string,
  webhookToken: string,
  messageId: string,
) {
  const result = await rest.runMethod(
    "delete",
    endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId),
  );

  return result;
}
