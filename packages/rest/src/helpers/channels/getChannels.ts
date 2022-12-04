import { BigString, DiscordChannel } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { Channel } from '../../transformers/channel.js'

/**
 * Gets the list of channels for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the channels of.
 * @returns A collection of {@link Channel} objects assorted by channel ID.
 *
 * @remarks
 * Excludes threads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
 */
export async function getChannels (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<bigint, Channel>> {
  const results = await rest.runMethod<DiscordChannel[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_CHANNELS(guildId)
  )

  const id = rest.transformers.snowflake(guildId)

  return new Collection(
    results.map((result) => {
      const channel = rest.transformers.channel(rest, {
        channel: result,
        guildId: id
      })
      return [channel.id, channel]
    })
  )
}
