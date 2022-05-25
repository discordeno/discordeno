import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/** Returns the new webhook object for the given id, this call does not require authentication and returns no user in the webhook object. */
export async function getWebhookWithToken(bot: Bot, webhookId: bigint, token: string) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK(webhookId, token),
  );

  return bot.transformers.webhook(bot, result);
}
