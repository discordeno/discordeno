import type {
  BigString,
  DiscordEditScheduledEvent,
  DiscordScheduledEvent,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { ScheduledEvent } from '../../../transformers/scheduledEvent.js'

/**
 * Edits a scheduled event.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit the scheduled event in.
 * @param eventId - The ID of the scheduled event to edit.
 * @returns An instance of the edited {@link ScheduledEvent}.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * To start or end an event, modify the event's `status` property.
 *
 * The `entity_metadata` property is discarded for events whose `entity_type` is not {@link ScheduledEventEntityType.External}.
 *
 * Fires a _Guild Scheduled Event Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event}
 */
export async function editScheduledEvent (
  rest: RestManager,
  guildId: BigString,
  eventId: BigString,
  options: Partial<EditScheduledEvent>
): Promise<ScheduledEvent> {
  const result = await rest.runMethod<DiscordScheduledEvent>(
    rest,
    'PATCH',
    rest.constants.routes.GUILD_SCHEDULED_EVENT(guildId, eventId),
    {
      channel_id:
        options.channelId === null ? null : options.channelId?.toString(),
      entity_metadata: options.location ? { location: options.location } : null,
      name: options.name,
      description: options.description,
      scheduled_start_time: options.scheduledStartTime
        ? new Date(options.scheduledStartTime).toISOString()
        : undefined,
      scheduled_end_time: options.scheduledEndTime
        ? new Date(options.scheduledEndTime).toISOString()
        : undefined,
      privacy_level: options.privacyLevel,
      entity_type: options.entityType,
      status: options.status,
      reason: options.reason
    } as DiscordEditScheduledEvent
  )

  return rest.transformers.scheduledEvent(rest, result)
}

export interface EditScheduledEvent extends WithReason {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId: BigString | null
  /** location of the event */
  location?: string
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduledStartTime: string
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: string
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** the status of the scheduled event */
  status: ScheduledEventStatus
}
