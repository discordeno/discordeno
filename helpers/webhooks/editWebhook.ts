import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(bot: Bot, webhookId: bigint, options: ModifyWebhook) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "patch",
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
  /** The reason you are modifying this webhook */
  reason?: string;
}
