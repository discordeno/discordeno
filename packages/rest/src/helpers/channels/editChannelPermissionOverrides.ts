import { routes } from '@discordeno/constant'
import type {
  BigString,
  DiscordEditChannelPermissionOverridesOptions,
  OverwriteReadable,
  WithReason
} from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Edits the permission overrides for a user or role in a channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel to edit the permission overrides of.
 * @param options - The permission override.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Only permissions the bot user has in the guild or parent channel can be allowed/denied __unless__ the bot user has a `MANAGE_ROLES` permission override in the channel.
 *
 * Fires a _Channel Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#edit-channel-permissions}
 */
export async function editChannelPermissionOverrides (
  rest: RestManager,
  channelId: BigString,
  options: EditChannelPermissionOverridesOptions
): Promise<void> {
  return await rest.runMethod<void>(
    'PUT',
    routes.CHANNEL_OVERWRITE(channelId, options.id),
    {
      allow: options.allow ? calculateBits(options.allow) : '0',
      deny: options.deny ? calculateBits(options.deny) : '0',
      type: options.type,
      reason: options.reason
    } as DiscordEditChannelPermissionOverridesOptions
  )
}

export interface EditChannelPermissionOverridesOptions
  extends OverwriteReadable,
  WithReason {}
