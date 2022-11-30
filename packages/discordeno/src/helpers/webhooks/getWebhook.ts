import type { Bot } from "../../bot.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Gets a webhook by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to get.
 * @returns An instance of {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
 */
export async function getWebhook(bot: Bot, webhookId: BigString): Promise<Webhook> {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_ID(webhookId),
  );

  return bot.transformers.webhook(bot, result);
}
