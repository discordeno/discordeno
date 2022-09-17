import type { Bot } from "../../bot.ts";
import { BigString, WithReason } from "../../mod.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/**
 * Creates a webhook.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to create the webhook in.
 * @param options - The parameters for the creation of the webhook.
 * @returns An instance of the created {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * ⚠️ The webhook name must not contain the string 'clyde' (case-insensitive).
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#create-webhook}
 */
export async function createWebhook(bot: Bot, channelId: BigString, options: CreateWebhook): Promise<Webhook> {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_WEBHOOKS(channelId),
    {
      name: options.name,
      avatar: options.avatar ? await bot.utils.urlToBase64(options.avatar) : undefined,
      reason: options.reason,
    },
  );

  return bot.transformers.webhook(bot, result);
}

export interface CreateWebhook extends WithReason {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image url for the default webhook avatar */
  avatar?: string | null;
}
