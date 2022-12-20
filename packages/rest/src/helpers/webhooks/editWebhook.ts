import { routes } from '@discordeno/constant'
import type { BigString, DiscordModifyWebhook, DiscordWebhook, WithReason } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Edits a webhook.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to edit.
 * @returns An instance of the edited {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#edit-webhook}
 */
export async function editWebhook (
  rest: RestManager,
  webhookId: BigString,
  options: ModifyWebhook
): Promise<Webhook> {
  const result = await rest.runMethod<DiscordWebhook>(

    'PATCH',
    routes.WEBHOOK_ID(webhookId),
    {
      name: options.name,
      avatar: options.avatar,
      channel_id: options.channelId,
      reason: options.reason
    } as DiscordModifyWebhook
  )

  return rest.transformers.webhook(rest, result)
}

export interface ModifyWebhook extends WithReason {
  /** The default name of the webhook */
  name?: string
  /** Image for the default webhook avatar */
  avatar?: BigString | null
  /** The new channel id this webhook should be moved to */
  channelId?: BigString
}
