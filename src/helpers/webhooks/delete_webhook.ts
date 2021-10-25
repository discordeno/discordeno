import type { Bot } from "../../bot.ts";

/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export async function deleteWebhook(bot: Bot, channelId: bigint, webhookId: bigint) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);

  return await bot.rest.runMethod<undefined>(bot.rest, "delete", bot.constants.endpoints.WEBHOOK_ID(webhookId));
}
