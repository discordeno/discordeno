/** Types for: https://discord.com/developers/docs/resources/guild-scheduled-event */

import type { DiscordUser } from '../discord.js'

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure */
export interface DiscordScheduledEvent {
  /** the id of the scheduled event */
  id: string
  /** the guild id which the scheduled event belongs to */
  guild_id: string
  /** the channel id in which the scheduled event will be hosted if specified */
  channel_id: string | null
  /** the id of the user that created the scheduled event */
  creator_id?: string | null
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduled_start_time: string
  /** the time the scheduled event will end if it does end. */
  scheduled_end_time: string | null
  /** the privacy level of the scheduled event */
  privacy_level: ScheduledEventPrivacyLevel
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the type of hosting entity associated with a scheduled event */
  entity_type: ScheduledEventEntityType
  /** any additional id of the hosting entity associated with event */
  entity_id: string | null
  /** the entity metadata for the scheduled event */
  entity_metadata: DiscordScheduledEventEntityMetadata | null
  /** the user that created the scheduled event */
  creator?: DiscordUser
  /** the number of users subscribed to the scheduled event */
  user_count?: number
  /** the cover image hash of the scheduled event */
  image?: string | null
  /** the definition for how often this event should recur */
  recurrence_rule: DiscordScheduledEventRecurrenceRule | null
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
export enum ScheduledEventPrivacyLevel {
  /** the scheduled event is only accessible to guild members */
  GuildOnly = 2,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
export enum ScheduledEventEntityType {
  StageInstance = 1,
  Voice,
  External,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
export enum ScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata */
export interface DiscordScheduledEventEntityMetadata {
  /** location of the event */
  location?: string
}

// TODO: missing ScheduledEventUser: https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-user-object-guild-scheduled-event-user-structure

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-structure */
export interface DiscordScheduledEventRecurrenceRule {
  /** Starting time of the recurrence interval */
  start: string
  /** Ending time of the recurrence interval */
  end: string | null
  /** How often the event occurs */
  frequency: DiscordScheduledEventRecurrenceRuleFrequency
  /** The spacing between the events, defined by `frequency`. For example, `frequency` of `Weekly` and an `interval` of `2` would be "every-other week" */
  interval: number
  /** Set of specific days within a week for the event to recur on */
  by_weekday: DiscordScheduledEventRecurrenceRuleWeekday[] | null
  /** List of specific days within a specific week (1-5) to recur on */
  by_n_weekday: DiscordScheduledEventRecurrenceRuleNWeekday[] | null
  /** Set of specific months to recur on */
  by_month: DiscordScheduledEventRecurrenceRuleMonth[] | null
  /** Set of specific dates within a month to recur on */
  by_month_day: number[] | null
  /** Set of days within a year to recur on (1-364) */
  by_year_day: number[] | null
  /** The total amount of times that the event is allowed to recur before stopping */
  count: number | null
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-frequency */
export enum DiscordScheduledEventRecurrenceRuleFrequency {
  Yearly,
  Monthly,
  Weekly,
  Daily,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-weekday */
export enum DiscordScheduledEventRecurrenceRuleWeekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-nweekday-structure */
export interface DiscordScheduledEventRecurrenceRuleNWeekday {
  /** The week to reoccur on. 1 - 5 */
  n: number
  /** The day within the week to reoccur on */
  day: DiscordScheduledEventRecurrenceRuleWeekday
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-month */
export enum DiscordScheduledEventRecurrenceRuleMonth {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
