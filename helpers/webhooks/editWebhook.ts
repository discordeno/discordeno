import type { ModifyWebhook } from "../../types/webhooks/modifyWebhook.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import type { Bot } from "../../bot.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(bot: Bot, webhookId: bigint, options: ModifyWebhook) {
  const result = await bot.rest.runMethod<Webhook>(bot.rest, "patch", bot.constants.endpoints.WEBHOOK_ID(webhookId), {
    name: options.name,
    avatar: options.avatar,
    channel_id: options.channelId,
    reason: options.reason,
  });

  return bot.transformers.webhook(bot, result);
}
