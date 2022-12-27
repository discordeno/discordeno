import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Unpins a pinned message in a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel where the message is pinned.
 * @param messageId - The ID of the message to unpin.
 *
 * @remarks
 * Requires that the bot user be able to see the contents of the channel in which the messages were posted.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * Fires a _Channel Pins Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#unpin-message}
 */
export async function unpinMessage (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(

    'DELETE',
    routes.CHANNEL_PIN(channelId, messageId),
    reason ? { reason } : undefined
  )
}
