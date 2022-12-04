import {
  BigString,
  DiscordScheduledEvent,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel
} from '@discordeno/types'
import { validateLength } from '@discordeno/utils'
import { WithReason } from '../../../index.js'
import { RestManager } from '../../../restManager.js'
import { ScheduledEvent } from '../../../transformers/scheduledEvent.js'

/**
 * Creates a scheduled event in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to create the scheduled event in.
 * @param options - The parameters for the creation of the scheduled event.
 * @returns An instance of the created {@link ScheduledEvent}.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * A guild can only have a maximum of 100 events with a status of {@link ScheduledEventStatus.Active} or {@link ScheduledEventStatus.Scheduled} (inclusive).
 *
 * Fires a _Guild Scheduled Event Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event}
 */
export async function createScheduledEvent (
  rest: RestManager,
  guildId: BigString,
  options: CreateScheduledEvent
): Promise<ScheduledEvent> {
  if (!validateLength(options.name, { min: 1, max: 100 })) {
    throw new Error('Name must be between 1-100 characters.')
  }
  if (
    options.description &&
    !validateLength(options.description, { max: 1000 })
  ) {
    throw new Error('Description must be below 1000 characters.')
  }
  if (options.location) {
    if (!validateLength(options.location, { max: 100 })) {
      throw new Error('Location must be below 100 characters.')
    }
    if (options.entityType === ScheduledEventEntityType.Voice) {
      throw new Error('Location can not be provided for a Voice event.')
    }
  }
  if (options.entityType === ScheduledEventEntityType.External) {
    if (!options.scheduledEndTime) {
      throw new Error(
        'A scheduled end time is required when making an External event.'
      )
    }
    if (!options.location) {
      throw new Error('A location is required when making an External event.')
    }
  }
  if (
    options.scheduledStartTime &&
    options.scheduledEndTime &&
    options.scheduledStartTime > options.scheduledEndTime
  ) {
    throw new Error('Cannot schedule event to end before starting.')
  }

  const result = await rest.runMethod<DiscordScheduledEvent>(
    rest,
    'POST',
    rest.constants.routes.GUILD_SCHEDULED_EVENTS(guildId),
    {
      channel_id: options.channelId?.toString(),
      entity_metadata: options.location
        ? { location: options.location }
        : undefined,
      name: options.name,
      description: options.description,
      scheduled_start_time: new Date(options.scheduledStartTime).toISOString(),
      scheduled_end_time: options.scheduledEndTime
        ? new Date(options.scheduledEndTime).toISOString()
        : undefined,
      privacy_level:
        options.privacyLevel ?? ScheduledEventPrivacyLevel.GuildOnly,
      entity_type: options.entityType,
      reason: options.reason
    }
  )

  return rest.transformers.scheduledEvent(rest, result)
}

export interface CreateScheduledEvent extends WithReason {
  /** the channel id of the scheduled event. */
  channelId?: BigString
  /** location of the event. Required for events with `entityType: ScheduledEventEntityType.External` */
  location?: string
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description: string
  /** the time the scheduled event will start */
  scheduledStartTime: number
  /** the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External` */
  scheduledEndTime?: number
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
}
