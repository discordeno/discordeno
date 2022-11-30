import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Deletes a webhook.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to delete.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
 */
export async function deleteWebhook(bot: Bot, webhookId: BigString, reason?: string): Promise<void> {
  return await bot.rest.runMethod<void>(bot.rest, "DELETE", bot.constants.routes.WEBHOOK_ID(webhookId), { reason });
}
