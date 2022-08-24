import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/** Returns the new webhook object for the given id. */
export async function getWebhook(bot: Bot, webhookId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "GET",
    bot.constants.routes.WEBHOOK_ID(webhookId),
  );

  return bot.transformers.webhook(bot, result);
}
