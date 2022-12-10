import type {
  BigString,
  DiscordChannel,
  SnakeToCamelCaseNested
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { snakeToCamelCaseNested } from '../../transformer.js'

/**
 * Gets a channel by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get.
 * @returns An instance of {@link DiscordChannel}.
 *
 * @remarks
 * If the channel is a thread, a {@link ThreadMember} object is included in the result.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel}
 */
export async function getChannel (
  rest: RestManager,
  channelId: BigString
): Promise<SnakeToCamelCaseNested<DiscordChannel>> {
  const result = await rest.runMethod<DiscordChannel>(
    rest,
    'GET',
    rest.constants.routes.CHANNEL(channelId)
  )

  // IF A CHANNEL DOESN'T EXIST, DISCORD RETURNS `{}`
  return snakeToCamelCaseNested(result)
}
