import type { Bot } from "../../bot.ts";
import { WithReason } from "../../mod.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/**
 * Edits a webhook.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to edit.
 * @returns An instance of the edited {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook}
 */
export async function editWebhook(bot: Bot, webhookId: bigint, options: WithReason<ModifyWebhook>): Promise<Webhook> {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK_ID(webhookId),
    {
      name: options.name,
      avatar: options.avatar,
      channel_id: options.channelId,
      reason: options.reason,
    },
  );

  return bot.transformers.webhook(bot, result);
}

export interface ModifyWebhook {
  /** The default name of the webhook */
  name?: string;
  /** Image for the default webhook avatar */
  avatar?: bigint | null;
  /** The new channel id this webhook should be moved to */
  channelId?: bigint;
}
