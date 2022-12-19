import { routes } from '@discordeno/constant'
import type { BigString, DiscordModifyGuildChannelPositions } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

export const swapChannels = editChannelPositions

/**
 * Edits the positions of a set of channels in a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild in which to edit the positions of the channels.
 * @param channelPositions - A set of objects defining the updated positions of the channels.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Fires a _Channel Update_ gateway event for every channel impacted in this change.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions}
 */
export async function editChannelPositions (
  rest: RestManager,
  guildId: BigString,
  channelPositions: ModifyGuildChannelPositions[]
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'PATCH',
    routes.GUILD_CHANNELS(guildId),
    channelPositions.map((channelPosition) => ({
      id: channelPosition.id.toString(),
      position: channelPosition.position,
      lock_positions: channelPosition.lockPositions,
      parent_id: channelPosition.parentId?.toString()
    })) as DiscordModifyGuildChannelPositions[]
  )
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
export interface ModifyGuildChannelPositions {
  /** Channel id */
  id: BigString
  /** Sorting position of the channel */
  position: number | null
  /** Syncs the permission overwrites with the new parent, if moving to a new category */
  lockPositions?: boolean | null
  /** The new parent ID for the channel that is moved */
  parentId?: BigString | null
}
