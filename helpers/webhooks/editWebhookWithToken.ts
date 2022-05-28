import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { ModifyWebhook } from "./editWebhook.ts";

/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(
  bot: Bot,
  webhookId: bigint,
  webhookToken: string,
  options: Omit<ModifyWebhook, "channelId">,
) {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK(webhookId, webhookToken),
    {
      name: options.name,
      avatar: options.avatar,
    },
  );

  return bot.transformers.webhook(bot, result);
}
