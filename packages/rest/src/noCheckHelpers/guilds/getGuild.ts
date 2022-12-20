// @ts-nocheck

import type { BigString, DiscordGuild } from '@discordeno/types'
import { calculateShardId } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Guild } from '../../transformers/guild.js'

/**
 * Gets a guild by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get.
 * @param options - The parameters for the fetching of the guild.
 * @returns An instance of {@link Guild}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild}
 */
export async function getGuild (
  rest: RestManager,
  guildId: BigString,
  numberOfShard: number,
  options: { counts?: boolean } = {
    counts: true
  }
): Promise<Guild> {
  const result = await rest.runMethod<DiscordGuild>(

    'GET',
    routes.GUILD(guildId, options.counts)
  )

  return rest.transformers.guild(rest, {
    guild: result,
    shardId: calculateShardId(
      numberOfShard,
      rest.transformers.snowflake(guildId)
    )
  })
}
