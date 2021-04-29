import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

export async function deleteWebhookMessage(
  webhookId: string,
  webhookToken: string,
  messageId: string,
) {
  return await rest.runMethod<undefined>(
    "delete",
    endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId),
  );
}
