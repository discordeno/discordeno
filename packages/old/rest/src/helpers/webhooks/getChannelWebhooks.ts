import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordWebhook } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets a list of webhooks for a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel which to get the webhooks of.
 * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
 */
export async function getChannelWebhooks (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<string, Camelize<DiscordWebhook>>> {
  const results = await rest.runMethod<DiscordWebhook[]>(
    'GET',
    routes.CHANNEL_WEBHOOKS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = TRANSFORMERS.webhook(result)
      return [webhook.id, webhook]
    })
  )
}
