import type { BigString, DiscordScheduledEvent } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { ScheduledEvent } from '../../../transformers/scheduledEvent.js'

/**
 * Gets the list of scheduled events for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the scheduled events from.
 * @param options - The parameters for the fetching of the scheduled events.
 * @returns A collection of {@link ScheduledEvent} objects assorted by event ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild}
 */
export async function getScheduledEvents (
  rest: RestManager,
  guildId: BigString,
  options?: GetScheduledEvents
): Promise<Collection<bigint, ScheduledEvent>> {
  const results = await rest.runMethod<DiscordScheduledEvent[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_SCHEDULED_EVENTS(
      guildId,
      options?.withUserCount
    )
  )

  return new Collection(
    results.map((result) => {
      const event = rest.transformers.scheduledEvent(rest, result)
      return [event.id, event]
    })
  )
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean
}
