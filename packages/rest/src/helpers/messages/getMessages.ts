import { routes } from '@discordeno/constant'
import type { BigString, DiscordMessage, GetMessagesOptions } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Message } from '../../transformers/message.js'

/**
 * Gets multiple messages from a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel from which to get the messages.
 * @param options - The parameters for the fetching of the messages.
 * @returns A collection of {@link Message} objects assorted by message ID.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * If getting a messages from a guild channel:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-messages}
 */
export async function getMessages (
  rest: RestManager,
  channelId: BigString,
  options?: GetMessagesOptions
): Promise<Collection<bigint, Message>> {
  const results = await rest.runMethod<DiscordMessage[]>(
    rest,
    'GET',
    routes.CHANNEL_MESSAGES(channelId, options)
  )

  return new Collection(
    results.map((result) => {
      const message = rest.transformers.message(rest, result)
      return [message.id, message]
    })
  )
}
