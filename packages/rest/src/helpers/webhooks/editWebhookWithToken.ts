import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordWebhook } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { ModifyWebhook } from './editWebhook.js'

/**
 * Edits a webhook using the webhook token, thereby bypassing the need for authentication + permissions.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to edit.
 * @param token - The webhook token, used to edit the webhook.
 * @returns An instance of the edited {@link DiscordWebhook}.
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
): Promise<Camelize<DiscordWebhook>> {
  const result = await rest.runMethod<DiscordWebhook>(
    'PATCH',
    routes.WEBHOOK(webhookId, token),
    {
      name: options.name,
      avatar: options.avatar
    }
  )

  return TRANSFORMERS.webhook(result)
}
