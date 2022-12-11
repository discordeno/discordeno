import type { BigString, DiscordMessage } from '@discordeno/types'
import { Collection, hasProperty } from '@discordeno/utils'
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
  if (options?.limit && (options.limit < 0 || options.limit > 100)) {
    throw new Error(rest.constants.Errors.INVALID_GET_MESSAGES_LIMIT)
  }

  const results = await rest.runMethod<DiscordMessage[]>(
    rest,
    'GET',
    rest.constants.routes.CHANNEL_MESSAGES(channelId, options)
  )

  return new Collection(
    results.map((result) => {
      const message = rest.transformers.message(rest, result)
      return [message.id, message]
    })
  )
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: BigString
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: BigString
}

export type GetMessagesOptions =
  | GetMessagesAfter
  | GetMessagesBefore
  | GetMessagesAround
  | GetMessagesLimit

export function isGetMessagesAfter (
  options: GetMessagesOptions
): options is GetMessagesAfter {
  return hasProperty(options, 'after')
}

export function isGetMessagesBefore (
  options: GetMessagesOptions
): options is GetMessagesBefore {
  return hasProperty(options, 'before')
}

export function isGetMessagesAround (
  options: GetMessagesOptions
): options is GetMessagesAround {
  return hasProperty(options, 'around')
}

export function isGetMessagesLimit (
  options: GetMessagesOptions
): options is GetMessagesLimit {
  return hasProperty(options, 'limit')
}
