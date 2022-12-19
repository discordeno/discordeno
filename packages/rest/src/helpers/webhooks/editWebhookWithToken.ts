import { routes } from '@discordeno/constant'
import type { BigString, DiscordWebhook } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'
import type { ModifyWebhook } from './editWebhook.js'

/**
 * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param rest - The rest manager to use to make the request.
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
export async function editWebhookWithToken (
  rest: RestManager,
  webhookId: BigString,
  token: string,
  options: Omit<ModifyWebhook, 'channelId'>
): Promise<Webhook> {
  const result = await rest.runMethod<DiscordWebhook>(
    rest,
    'PATCH',
    routes.WEBHOOK(webhookId, token),
    {
      name: options.name,
      avatar: options.avatar
    }
  )

  return rest.transformers.webhook(rest, result)
}
