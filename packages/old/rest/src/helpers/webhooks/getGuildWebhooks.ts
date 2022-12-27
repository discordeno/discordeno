import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordWebhook } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the list of webhooks for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of webhooks for.
 * @returns A collection of {@link DiscordWebhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
 */
export async function getGuildWebhooks (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordWebhook>>> {
  const results = await rest.runMethod<DiscordWebhook[]>(
    'GET',
    routes.GUILD_WEBHOOKS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = TRANSFORMERS.webhook(result)
      return [webhook.id, webhook]
    })
  )
}
