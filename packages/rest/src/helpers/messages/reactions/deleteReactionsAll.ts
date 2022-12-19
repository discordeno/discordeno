import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Deletes all reactions for all emojis from a message.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reactions from is in.
 * @param messageId - The ID of the message to delete the reactions from.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Reaction Remove All_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions}
 */
export async function deleteReactionsAll (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    routes.CHANNEL_MESSAGE_REACTIONS(channelId, messageId)
  )
}
