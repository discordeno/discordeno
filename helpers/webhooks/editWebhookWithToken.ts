import type { Bot } from "../../bot.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { ModifyWebhook } from "./editWebhook.ts";

/**
 * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to edit.
 * @param token - The webhook token, used to edit the webhook.
 * @returns An instance of the edited {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token}
 */
export async function editWebhookWithToken(
  bot: Bot,
  webhookId: BigString,
  token: string,
  options: Omit<ModifyWebhook, "channelId">,
): Promise<Webhook> {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    "PATCH",
    bot.constants.routes.WEBHOOK(webhookId, token),
    {
      name: options.name,
      avatar: options.avatar,
    },
  );

  return bot.transformers.webhook(bot, result);
}
