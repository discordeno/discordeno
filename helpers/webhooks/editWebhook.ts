import type { Bot } from "../../bot.ts";
import { ModifyWebhook } from "../../types/discordeno.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(bot: Bot, webhookId: bigint, options: ModifyWebhook) {
  const result = await bot.rest.runMethod<DiscordWebhook>(bot.rest, "patch", bot.constants.endpoints.WEBHOOK_ID(webhookId), {
    name: options.name,
    avatar: options.avatar,
    channel_id: options.channelId,
    reason: options.reason,
  });

  return bot.transformers.webhook(bot, result);
}
