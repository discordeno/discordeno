import type { ModifyWebhook } from "../../types/webhooks/modifyWebhook.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import type { Bot } from "../../bot.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  options: Omit<ModifyWebhook, "channelId">,
) {
  const result = await bot.rest.runMethod<Webhook>(
    bot.rest,
    "patch",
    bot.constants.endpoints.WEBHOOK(webhookId, webhookToken),
    {
      name: options.name,
      avatar: options.avatar,
    },
  );

  return bot.transformers.webhook(bot, result);
}
