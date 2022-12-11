import type {
  BigString,
  DiscordChannel,
  SnakeToCamelCaseNested
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import { snakeToCamelCaseNested } from '../../transformer.js'

/**
 * Gets the list of channels for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the channels of.
 * @returns A collection of {@link DiscordChannel} objects assorted by channel ID.
 *
 * @remarks
 * Excludes threads.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-channels}
 */
export async function getChannels (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, SnakeToCamelCaseNested<DiscordChannel>>> {
  const results = await rest.runMethod<DiscordChannel[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_CHANNELS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const channel = snakeToCamelCaseNested(result)
      return [channel.id, channel]
    })
  )
}
