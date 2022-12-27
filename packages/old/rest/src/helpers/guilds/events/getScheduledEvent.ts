import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordScheduledEvent } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets a scheduled event by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the scheduled event from.
 * @param eventId - The ID of the scheduled event to get.
 * @param options - The parameters for the fetching of the scheduled event.
 * @returns An instance of {@link ScheduledEvent}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event}
 */
export async function getScheduledEvent (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString,
  options?: { withUserCount?: boolean }
): Promise<Camelize<DiscordScheduledEvent>> {
  const result = await rest.runMethod<DiscordScheduledEvent>(
    'GET',
    routes.GUILD_SCHEDULED_EVENT(
      guildId,
      eventId,
      options?.withUserCount
    )
  )

  return TRANSFORMERS.event(result)
}
