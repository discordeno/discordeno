import { BigString, DiscordThreadMember } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { ThreadMember } from '../../../transformers/threadMember.js'

/**
 * Gets a thread member by their user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to get the thread member of.
 * @param userId - The user ID of the thread member to get.
 * @returns An instance of {@link ThreadMember}.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-thread-member}
 */
export async function getThreadMember (
  rest: RestManager,
  channelId: BigString,
  userId: BigString
): Promise<ThreadMember> {
  const result = await rest.runMethod<DiscordThreadMember>(
    rest,
    'GET',
    rest.constants.routes.THREAD_USER(channelId, userId)
  )

  return rest.transformers.threadMember(rest, result)
}
