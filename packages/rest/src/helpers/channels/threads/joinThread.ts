import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Adds the bot user to a thread.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the thread to add the bot user to.
 *
 * @remarks
 * Requires the thread not be archived.
 *
 * Fires a _Thread Members Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#join-thread}
 */
export async function joinThread (
  rest: RestManager,
  channelId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'PUT',
    rest.constants.routes.THREAD_ME(channelId)
  )
}
