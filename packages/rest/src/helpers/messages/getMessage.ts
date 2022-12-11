import type { BigString, DiscordMessage } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Message } from '../../transformers/message.js'

/**
 * Gets a message from a channel by the ID of the message.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel from which to get the message.
 * @param messageId - The ID of the message to get.
 * @returns An instance of {@link Message}.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the message was posted.
 *
 * If getting a message from a guild channel:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-message}
 */
export async function getMessage (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString
): Promise<Message> {
  const result = await rest.runMethod<DiscordMessage>(
    rest,
    'GET',
    rest.constants.routes.CHANNEL_MESSAGE(channelId, messageId)
  )

  return rest.transformers.message(rest, result)
}
