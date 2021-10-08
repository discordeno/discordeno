import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import type { Message } from "../../types/messages/message.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a previousy-sent webhook message from the same token. Returns a message object on success. */
export async function getWebhookMessage(webhookId: bigint, webhookToken: string, messageId: bigint) {
  const result = await rest.runMethod<Message>("get", endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId));

  return await structures.createDiscordenoMessage(result);
}
