import { routes } from '@discordeno/constant'
import type { BigString, DiscordWebhook } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Gets a webhook by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to get.
 * @returns An instance of {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
 */
export async function getWebhook (
  rest: RestManager,
  webhookId: BigString
): Promise<Webhook> {
  const result = await rest.runMethod<DiscordWebhook>(

    'GET',
    routes.WEBHOOK_ID(webhookId)
  )

  return rest.transformers.webhook(rest, result)
}
