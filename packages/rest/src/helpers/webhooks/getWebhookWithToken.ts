import type { BigString, DiscordWebhook } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Gets a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to get.
 * @param token - The webhook token, used to get the webhook.
 * @returns An instance of {@link Webhook}.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-with-token}
 */
export async function getWebhookWithToken (
  rest: RestManager,
  webhookId: BigString,
  token: string
): Promise<Webhook> {
  const result = await rest.runMethod<DiscordWebhook>(
    rest,
    'GET',
    rest.constants.routes.WEBHOOK(webhookId, token)
  )

  return rest.transformers.webhook(rest, result)
}
