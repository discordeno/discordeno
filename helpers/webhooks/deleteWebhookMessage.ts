import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes a webhook message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to delete the message belonging to.
 * @param token - The webhook token, used to manage the webhook.
 * @param messageId - The ID of the message to delete.
 * @param options - The parameters for the deletion of the message.
 *
 * @remarks
 * Fires a _Message Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
 */
export async function deleteWebhookMessage(
  bot: Bot,
  webhookId: BigString,
  token: string,
  messageId: BigString,
  options?: DeleteWebhookMessageOptions,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.WEBHOOK_MESSAGE(webhookId, token, messageId, options),
  );
}

export interface DeleteWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: BigString;
}
