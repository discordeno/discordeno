import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

export async function deleteWebhookMessage(webhookId: bigint, webhookToken: string, messageId: bigint) {
  return await rest.runMethod<undefined>("delete", endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId));
}
