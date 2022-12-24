import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordModifyWebhook,
  DiscordWebhook,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Edits a webhook.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to edit.
 * @returns An instance of the edited {@link DiscordWebhook}.
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
): Promise<Camelize<DiscordWebhook>> {
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

  return TRANSFORMERS.webhook(result)
}

export interface ModifyWebhook extends WithReason {
  /** The default name of the webhook */
  name?: string
  /** Image for the default webhook avatar */
  avatar?: BigString | null
  /** The new channel id this webhook should be moved to */
  channelId?: BigString
}
