import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes a channel from within a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to delete.
 * @returns An instance of the deleted {@link Channel}.
 *
 * @remarks
 * For community guilds, the _Rules_, _Guidelines_ and _Community Update_ channels cannot be deleted.
 *
 * If the channel is a thread:
 * - Requires the `MANAGE_THREADS` permission.
 *
 * - Fires a _Thread Delete_ gateway event.
 *
 * Otherwise:
 * - Requires the `MANAGE_CHANNELS` permission.
 *
 * - ⚠️ Deleting a category channel does not delete its child channels.
 *   Instead, they will have their `parent_id` property removed, and a `Channel Update` gateway event will fire for each of them.
 *
 * - Fires a _Channel Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#deleteclose-channel}
 */
export async function deleteChannel (
  rest: RestManager,
  channelId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.CHANNEL(channelId),
    {
      reason
    }
  )
}
