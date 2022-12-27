import { routes } from '@discordeno/constant'
import type { BigString, GetGuildPruneCountQuery } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

interface DiscordPrunedCount {
  pruned: number
}

/**
 * Gets the number of members that would be kicked from a guild during pruning.
 *
 * @param rest - The rest manager used to make the request
 * @param guildId - The ID of the guild to get the prune count of.
 * @param options - The parameters for the fetching of the prune count.
 * @returns A number indicating the number of members that would be kicked.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-prune-count}
 */
export async function getPruneCount (
  rest: RestManager,
  guildId: BigString,
  options?: GetGuildPruneCountQuery
): Promise<number> {
  const result = await rest.runMethod<DiscordPrunedCount>(

    'GET',
    routes.GUILD_PRUNE(guildId, options)
  )

  return result.pruned
}
