import { routes } from '@discordeno/constant'
import type { BigString, Camelize, DiscordChannel } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { snakeToCamelCaseNested } from '../../transformer.js'

/**
 * Gets a channel by its ID.
 *
 * @param rest - The rest manager to use to make the request.
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
): Promise<Camelize<DiscordChannel>> {
  const result = await rest.runMethod<DiscordChannel>(
    rest,
    'GET',
    routes.CHANNEL(channelId)
  )

  // IF A CHANNEL DOESN'T EXIST, DISCORD RETURNS `{}`
  return snakeToCamelCaseNested(result)
}
