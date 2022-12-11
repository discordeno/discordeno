import type { BigString, DiscordWebhook, WithReason, DiscordCreateWebhook } from '@discordeno/types'
import { urlToBase64 } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Creates a webhook.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to create the webhook in.
 * @param options - The parameters for the creation of the webhook.
 * @returns An instance of the created {@link Webhook}.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * ⚠️ The webhook name must not contain the string 'clyde' (case-insensitive).
 *
 * Fires a _Webhooks Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#create-webhook}
 */
export async function createWebhook (
  rest: RestManager,
  channelId: BigString,
  options: CreateWebhook
): Promise<Webhook> {
  const result = await rest.runMethod<DiscordWebhook>(
    rest,
    'POST',
    rest.constants.routes.CHANNEL_WEBHOOKS(channelId),
    {
      name: options.name,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
      reason: options.reason
    } as DiscordCreateWebhook
  )

  return rest.transformers.webhook(rest, result)
}

export interface CreateWebhook extends WithReason {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}
