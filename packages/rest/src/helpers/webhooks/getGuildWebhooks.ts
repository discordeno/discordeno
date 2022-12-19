import { routes } from '@discordeno/constant'
import type { BigString, DiscordWebhook } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Webhook } from '../../transformers/webhook.js'

/**
 * Gets the list of webhooks for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of webhooks for.
 * @returns A collection of {@link Webhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
 */
export async function getGuildWebhooks (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, Webhook>> {
  const results = await rest.runMethod<DiscordWebhook[]>(
    rest,
    'GET',
    routes.GUILD_WEBHOOKS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = rest.transformers.webhook(rest, result)
      return [webhook.id, webhook]
    })
  )
}
