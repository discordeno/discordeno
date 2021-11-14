import type { ModifyWebhook } from "../../types/webhooks/modifyWebhook.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import type { Bot } from "../../bot.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(bot: Bot, channelId: bigint, webhookId: bigint, options: ModifyWebhook) {
  return await bot.rest.runMethod<Webhook>(bot.rest, "patch", bot.constants.endpoints.WEBHOOK_ID(webhookId), {
    ...options,
    channel_id: options.channelId,
  });
}
