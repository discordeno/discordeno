import { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Removes the bot user from a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to remove the bot user from.
 *
 * @remarks
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#leave-thread}
 */
export async function leaveThread (
  rest: RestManager,
  channelId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.THREAD_ME(channelId)
  )
}
