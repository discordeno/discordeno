import type { Bot } from "../../bot.ts";
import type { CreateWebhook } from "../../types/webhooks/create_webhook.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import type { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/**
 * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
 *
 * Webhook names cannot be: 'clyde'
 */
export async function createWebhook(bot: Bot, channelId: bigint, options: CreateWebhook) {
  await bot.utils.requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  if (
    // Specific usernames that discord does not allow
    options.name === "clyde" ||
    !bot.utils.validateLength(options.name, { min: 2, max: 32 })
  ) {
    throw new Error(bot.constants.Errors.INVALID_WEBHOOK_NAME);
  }

  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<Webhook>>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_WEBHOOKS(channelId),
    {
      ...options,
      avatar: options.avatar ? await bot.utils.urlToBase64(options.avatar) : undefined,
    }
  );
}
