import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { processReactionString } from './getReactions.js'

// TODO: Improve typing of the `reaction` parameter.

/**
 * Adds a reaction to a message.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel the message to add a reaction to is in.
 * @param messageId - The ID of the message to add a reaction to.
 * @param reaction - The reaction to add to the message.
 * @returns
 *
 * @remarks
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * If nobody else has reacted to the message:
 * - Requires the `ADD_REACTIONS` permission.
 *
 * Fires a _Message Reaction Add_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#create-reaction}
 */
export async function addReaction (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  reaction: string
): Promise<void> {
  reaction = processReactionString(reaction)

  return await rest.runMethod<void>(
    rest,
    'PUT',
    routes.CHANNEL_MESSAGE_REACTION_ME(
      channelId,
      messageId,
      reaction
    )
  )
}
