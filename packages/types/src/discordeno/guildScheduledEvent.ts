/** Types for: https://discord.com/developers/docs/resources/guild-scheduled-event */

import type {
  DiscordScheduledEventEntityMetadata,
  DiscordScheduledEventRecurrenceRule,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
} from '../discord/guildScheduledEvent.js';
import type { BigString } from '../shared.js';

/** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild-query-string-params */
export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event-json-params */
export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: BigString;
  entityMetadata?: DiscordScheduledEventEntityMetadata;
  /** the name of the scheduled event */
  name: string;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the time the scheduled event will start */
  scheduledStartTime: string;
  /** the time the scheduled event will end if it does end. Required for events with `entityType: ScheduledEventEntityType.External` */
  scheduledEndTime?: string;
  /** the description of the scheduled event */
  description: string;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** the cover image of the scheduled event */
  image?: string;
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule;
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event-json-params */
export interface EditScheduledEvent {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId?: BigString | null;
  /** The entity metadata for the scheduled event */
  entityMetadata?: DiscordScheduledEventEntityMetadata | null;
  /** the name of the scheduled event */
  name?: string;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the time the scheduled event will start */
  scheduledStartTime?: string;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: string;
  /** the description of the scheduled event */
  description?: string | null;
  /** the type of hosting entity associated with a scheduled event */
  entityType?: ScheduledEventEntityType;
  /** the status of the scheduled event */
  status?: ScheduledEventStatus;
  /** the cover image of the scheduled event */
  image?: string;
  /** the definition for how often this event should recur */
  recurrenceRule?: DiscordScheduledEventRecurrenceRule | null;
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number;
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean;
  /** consider only users before given user id */
  before?: BigString;
  /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
  after?: BigString;
}
