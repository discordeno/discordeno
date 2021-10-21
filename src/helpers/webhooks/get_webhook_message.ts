import type { Message } from "../../types/messages/message.ts";
import type {SnakeCasedPropertiesDeep} from "../../types/util.ts";
import type {Bot} from "../../bot.ts";

/** Returns a previously-sent webhook message from the same token. Returns a message object on success. */
export async function getWebhookMessage(bot: Bot, webhookId: bigint, webhookToken: string, messageId: bigint) {
  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>>(bot.rest,"get", bot.constants.endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId));

  return bot.transformers.message(result);
}
