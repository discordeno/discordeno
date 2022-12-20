import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Adds a member to a thread.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the thread to add the member to.
 * @param userId - The user ID of the member to add to the thread.
 *
 * @remarks
 * Requires the ability to send messages in the thread.
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#add-thread-member}
 */
export async function addThreadMember (
  rest: RestManager,
  channelId: BigString,
  userId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    'PUT',
    routes.THREAD_USER(channelId, userId)
  )
}
