import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordWebhook } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Gets a webhook by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to get.
 * @returns An instance of {@link DiscordWebhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook}
 */
export async function getWebhook (
  rest: RestManager,
  webhookId: BigString
): Promise<Camelize<DiscordWebhook>> {
  const result = await rest.runMethod<DiscordWebhook>(
    'GET',
    routes.WEBHOOK_ID(webhookId)
  )

  return TRANSFORMERS.webhook(result)
}
