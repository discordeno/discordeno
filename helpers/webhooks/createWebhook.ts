import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/**
 * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
 *
 * Webhook names cannot be: 'clyde'
 */
export async function createWebhook(bot: Bot, channelId: bigint, options: CreateWebhook) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_WEBHOOKS(channelId),
    {
      name: options.name,
      avatar: options.avatar ? await bot.utils.urlToBase64(options.avatar) : undefined,
      reason: options.reason,
    },
  );

  return bot.transformers.webhook(bot, result);
}

export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image url for the default webhook avatar */
  avatar?: string | null;
  /** The reason you are creating this webhook */
  reason?: string;
}
