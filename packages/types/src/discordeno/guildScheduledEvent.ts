/** Types for: https://discord.com/developers/docs/resources/guild-scheduled-event */

import type {
  DiscordScheduledEventEntityMetadata,
  DiscordScheduledEventRecurrenceRule,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
} from '../discord/guildScheduledEvent.js'
import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild-query-string-params */
export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event-json-params */
export interface CreateScheduledEvent {
  /**
   * the channel id of the scheduled event.
   *
   * @remarks
   * Optional for events with entityType: {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}
   */
  channelId?: BigString
  /**
   * the entity metadata of the scheduled event
   *
   * @remarks
   * Required for events with entityType: {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}
   */
  entityMetadata?: DiscordScheduledEventEntityMetadata
  /** the name of the scheduled event */
  name: string
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel
  /** the time the scheduled event will start */
  scheduledStartTime: string
  /**
   * the time the scheduled event will end if it does end.
   *
   * @remarks
   * Required for events with entityType: {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}
   */
  scheduledEndTime?: string
  /** the description of the scheduled event */
  description: string
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event-json-params */
export interface EditScheduledEvent {
  /**
   * the channel id of the scheduled event.
   *
   * @remarks
   * if updating entityType to {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}, channelId is required and must be set to null
   */
  channelId: BigString | null
  /**
   * the entity metadata of the scheduled event
   *
   * @remarks
   * if updating entityType to {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}, entityData with a location field must be provided
   */
  entityMetadata: DiscordScheduledEventEntityMetadata
  /** the name of the scheduled event */
  name: string
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel
  /** the time the scheduled event will start */
  scheduledStartTime: string
  /**
   * the time the scheduled event will end if it does end.
   *
   * @remarks
   * if updating entityType to {@link ScheduledEventEntityType.External | ScheduledEventEntityType.External}, scheduledEndTime must be provided
   */
  scheduledEndTime?: string
  /** the description of the scheduled event */
  description?: string
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule | null
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean
  /**
   * consider only users before given user id
   *
   * @remarks
   * Provide a user id to before for pagination. Users will always be returned in ascending order by userId.
   * If both before and after are provided, only before is respected.
   *
   * Fetching users in-between before and after is not supported.
   */
  before?: BigString
  /**
   * consider only users after given user id
   *
   * @remarks
   * Provide a user id to after for pagination. Users will always be returned in ascending order by userId.
   * If both before and after are provided, only before is respected.
   *
   * Fetching users in-between before and after is not supported.
   */
  after?: BigString
}
