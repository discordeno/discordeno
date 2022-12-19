import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Removes a member from a thread.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the thread to remove the thread member of.
 * @param userId - The user ID of the thread member to remove.
 *
 * @remarks
 * If the thread is of type {@link ChannelTypes.GuildPrivateThread}, requires to be the creator of the thread.
 * Otherwise, requires the `MANAGE_THREADS` permission.
 *
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#remove-thread-member}
 */
export async function removeThreadMember (
  rest: RestManager,
  channelId: BigString,
  userId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    routes.THREAD_USER(channelId, userId)
  )
}
