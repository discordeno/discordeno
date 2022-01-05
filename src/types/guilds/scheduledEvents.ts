import { User } from "../users/user.ts";

export interface ScheduledEvent {
  /** the id of the scheduled event */
  id: string;
  /** the guild id which the scheduled event belongs to */
  guildId: string;
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId: string | null;
  /** the id of the user that created the scheduled event */
  creatorId?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: string;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime: string | null;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** any additional id of the hosting entity associated with event */
  entityId: string | null;
  /** the entity metadata for the scheduled event */
  entityMetadata: ScheduledEventEntityMetadata | null;
  /** the user that created the scheduled event */
  creator?: User;
  /** the number of users subscribed to the scheduled event */
  userCount?: number;
}

export enum ScheduledEventPrivacyLevel {
  /** the scheduled event is public and available in discovery. DISCORD DEVS DISABLED THIS! WILL ERROR IF USED! */
  // Public = 1,
  /** the scheduled event is only accessible to guild members */
  GuildOnly = 2,
}

export enum ScheduledEventEntityType {
  StageInstance = 1,
  Voice,
  External,
}

export enum ScheduledEventStatus {
  Scheduled = 1,
  Active,
  Completed,
  Canceled,
}

export interface ScheduledEventEntityMetadata {
  /** location of the event */
  location?: string;
}

export interface ScheduledEventUserRemove {
  /** id of the guild scheduled event  */
  guildScheduledEventId: string;
  /** id of the user                   */
  userId: string;
  /** id of the guild */
  guildId: string;
}

export interface ScheduledEventUserAdd {
  /** id of the guild scheduled event  */
  guildScheduledEventId: string;
  /** id of the user                   */
  userId: string;
  /** id of the guild */
  guildId: string;
}

export interface CreateScheduledEvent {
  /** the channel id of the scheduled event. */
  channelId?: bigint;
  /** location of the event */
  location?: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel?: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  reason?: string;
}

export interface EditScheduledEvent {
  /** the channel id of the scheduled event. null if switching to external event. */
  channelId: bigint | null;
  /** location of the event */
  location: string;
  /** the name of the scheduled event */
  name: string;
  /** the description of the scheduled event */
  description: string;
  /** the time the scheduled event will start */
  scheduledStartTime: number;
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number;
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  reason?: string;
}

export interface GetScheduledEvents {
  /** include number of users subscribed to each event */
  withUserCount?: boolean;
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number;
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean;
  /** consider only users before given user id */
  before?: bigint;
  /** consider only users after given user id */
  after?: bigint;
}
