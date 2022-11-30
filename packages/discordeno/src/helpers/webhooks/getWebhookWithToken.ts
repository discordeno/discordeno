import type { Bot } from '../../bot.js'
import { Webhook } from '../../transformers/webhook.js'
import { DiscordWebhook } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'

/**
 * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to get.
 * @param token - The webhook token, used to get the webhook.
 * @returns An instance of {@link Webhook}.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
 */
export async function getWebhookWithToken(bot: Bot, webhookId: BigString, token: string): Promise<Webhook> {
  const result = await bot.rest.runMethod<DiscordWebhook>(
    bot.rest,
    'GET',
    bot.constants.routes.WEBHOOK(webhookId, token)
  )

  return bot.transformers.webhook(bot, result)
}
