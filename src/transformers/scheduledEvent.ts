import { Bot } from "../bot.ts";
import {
  ScheduledEvent,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
} from "../types/guilds/scheduledEvents.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";

export function transformScheduledEvent(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<ScheduledEvent>
): DiscordenoScheduledEvent {
  return {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    creatorId: payload.creator_id ? bot.transformers.snowflake(payload.creator_id) : 0n,
    scheduledStartTime: Date.parse(payload.scheduled_start_time),
    scheduledEndTime: payload.scheduled_end_time ? Date.parse(payload.scheduled_end_time) : undefined,
    entityId: payload.entity_id ? bot.transformers.snowflake(payload.entity_id) : undefined,
    creator: payload.creator ? bot.transformers.user(bot, payload.creator) : undefined,

    name: payload.name,
    description: payload.description,
    privacyLevel: payload.privacy_level,
    status: payload.status,
    entityType: payload.entity_type,
    userCount: payload.user_count || 0,
    location: payload.entity_metadata?.location,
    image: payload.image ? bot.utils.iconHashToBigInt(payload.image) : undefined,
  };
}

export interface DiscordenoScheduledEvent {
  /** the id of the scheduled event */
  id: bigint;
  /** the guild id which the scheduled event belongs to */
  guildId: bigint;
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId?: bigint;
  /** the id of the user that created the scheduled event */
  creatorId: bigint;
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
  /** the status of the scheduled event */
  status: ScheduledEventStatus;
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType;
  /** any additional id of the hosting entity associated with event */
  entityId?: bigint;
  /** location of the event */
  location?: string;
  /** the user that created the scheduled event */
  creator?: DiscordenoUser;
  /** the number of users subscribed to the scheduled event */
  userCount: number;
  /** the cover image hash of the scheduled event */
  image?: bigint;
}
