import { routes } from '@discordeno/constant'
import type { BigString, DiscordMessage } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Message } from '../../transformers/message.js'

/**
 * Gets the pinned messages for a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to get the pinned messages for.
 * @returns A collection of {@link Message} objects assorted by message ID.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * If getting a message from a guild channel:
 * - Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-pinned-messages}
 */
export async function getPinnedMessages (
  rest: RestManager,
  channelId: BigString
): Promise<Collection<bigint, Message>> {
  const results = await rest.runMethod<DiscordMessage[]>(
    rest,
    'GET',
    routes.CHANNEL_PINS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const message = rest.transformers.message(rest, result)
      return [message.id, message]
    })
  )
}
