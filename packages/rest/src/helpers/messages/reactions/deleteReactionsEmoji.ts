import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { processReactionString } from './getReactions.js'

/**
 * Deletes all reactions for an emoji from a message.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel the message to delete the reactions from is in.
 * @param messageId - The ID of the message to delete the reactions from.
 * @param reaction - The reaction to remove from the message.
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Message Reaction Remove Emoji_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji}
 */
export async function deleteReactionsEmoji (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  reaction: string
): Promise<void> {
  reaction = processReactionString(reaction)

  return await rest.runMethod<void>(

    'DELETE',
    routes.CHANNEL_MESSAGE_REACTION(
      channelId,
      messageId,
      reaction
    )
  )
}
