import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to delete the message belonging to.
 * @param token - The webhook token, used to delete the webhook.
 *
 * @remarks
 * Fires a _Message Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
 */
export async function deleteWebhookWithToken(bot: Bot, webhookId: BigString, token: string): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.WEBHOOK(webhookId, token));
}
