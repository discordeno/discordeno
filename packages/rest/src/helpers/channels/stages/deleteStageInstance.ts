import { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Deletes the stage instance associated with a stage channel, if one exists.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the stage channel the stage instance is associated with.
 *
 * @remarks
 * Requires the user to be a moderator of the stage channel.
 *
 * Fires a _Stage Instance Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance}
 */
export async function deleteStageInstance (
  rest: RestManager,
  channelId: BigString,
  reason?: string
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.STAGE_INSTANCE(channelId),
    reason ? { reason } : undefined
  )
}
