import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, DiscordIntegration } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { Integration } from '../../../transformers/integration.js'

/**
 * Gets the list of integrations attached to a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of integrations from.
 * @returns A collection of {@link Integration} objects assorted by integration ID.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-integrations}
 */
export async function getIntegrations (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, Integration>> {
  const results = await rest.runMethod<DiscordIntegration[]>(

    'GET',
    routes.GUILD_INTEGRATIONS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const integration = TRANSFORMERS.integration(result)
      return [integration.id, integration]
    })
  )
}
