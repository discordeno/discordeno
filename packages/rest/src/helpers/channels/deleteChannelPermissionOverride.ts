import { routes } from '@discordeno/constant'
import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Deletes a permission override for a user or role in a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to delete the permission override of.
 * @param overwriteId - The ID of the permission override to delete.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Channel Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#delete-channel-permission}
 */
export async function deleteChannelPermissionOverride (
  rest: RestManager,
  channelId: BigString,
  overwriteId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    'DELETE',
    routes.CHANNEL_OVERWRITE(channelId, overwriteId),
    reason ? { reason } : undefined
  )
}
