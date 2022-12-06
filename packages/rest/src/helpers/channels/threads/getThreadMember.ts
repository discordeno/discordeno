import type {
  BigString,
  DiscordThreadMember,
  SnakeToCamelCaseNested
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Gets a thread member by their user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to get the thread member of.
 * @param userId - The user ID of the thread member to get.
 * @returns An instance of {@link DiscordThreadMember}.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
 */
export async function getThreadMember (
  rest: RestManager,
  channelId: BigString,
  userId: BigString
): Promise<SnakeToCamelCaseNested<DiscordThreadMember>> {
  const result = await rest.runMethod<DiscordThreadMember>(
    rest,
    'GET',
    rest.constants.routes.THREAD_USER(channelId, userId)
  )

  return snakeToCamelCaseNested(result)
}
