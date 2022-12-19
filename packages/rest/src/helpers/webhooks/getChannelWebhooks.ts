import { routes } from '@discordeno/constant'
import type { BigString, DiscordWebhook } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Gets a list of webhooks for a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel which to get the webhooks of.
 * @returns A collection of {@link Webhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
 */
export async function getChannelWebhooks (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<bigint, Webhook>> {
  const results = await rest.runMethod<DiscordWebhook[]>(
    rest,
    'GET',
    routes.CHANNEL_WEBHOOKS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = rest.transformers.webhook(rest, result)
      return [webhook.id, webhook]
    })
  )
}
