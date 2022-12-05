import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes a webhook.
 *
 * @param bot - The bot instance to use to make the request.
 * @param webhookId - The ID of the webhook to delete.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook}
 */
export async function deleteWebhook (
  rest: RestManager,
  webhookId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.WEBHOOK_ID(webhookId),
    { reason }
  )
}
