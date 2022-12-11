import type { BigString, DiscordBulkDeleteMessages } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes multiple messages from a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to delete the messages from.
 * @param messageIds - The IDs of the messages to delete from the channel.
 *
 * @remarks
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * ⚠️ Messages older than 2 weeks old cannot be deleted.
 *
 * Fires a _Message Delete Bulk_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#bulk-delete-messages}
 */
export async function deleteMessages (
  rest: RestManager,
  channelId: BigString,
  messageIds: BigString[],
  reason?: string
): Promise<void> {
  if (messageIds.length < 2) {
    throw new Error(rest.constants.Errors.DELETE_MESSAGES_MIN)
  }

  if (messageIds.length > 100) {
    console.warn(
      'This endpoint only accepts a maximum of 100 messages. Using the first 100 message ids provided.'
    )
  }

  return await rest.runMethod<void>(
    rest,
    'POST',
    rest.constants.routes.CHANNEL_BULK_DELETE(channelId),
    {
      messages: messageIds.slice(0, 100).map((id) => id.toString()),
      reason
    } as DiscordBulkDeleteMessages
  )
}
