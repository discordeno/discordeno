import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes a webhook message using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to delete the message belonging to.
 * @param token - The webhook token, used to delete the webhook.
 *
 * @remarks
 * Fires a _Message Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token}
 */
export async function deleteWebhookWithToken (
  rest: RestManager,
  webhookId: BigString,
  token: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.WEBHOOK(webhookId, token)
  )
}
