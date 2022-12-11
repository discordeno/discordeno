import type { BigString } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Deletes a scheduled event from a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to delete the scheduled event from.
 * @param eventId - The ID of the scheduled event to delete.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * Fires a _Guild Scheduled Event Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event}
 */
export async function deleteScheduledEvent (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString
): Promise<void> {
  return await rest.runMethod<void>(
    rest,
    'DELETE',
    rest.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId)
  )
}
