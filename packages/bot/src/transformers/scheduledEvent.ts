import type {
  DiscordScheduledEvent,
  DiscordScheduledEventEntityMetadata,
  ScheduledEventEntityType,
  ScheduledEventPrivacyLevel,
  ScheduledEventStatus,
} from '@discordeno/types'
import { iconHashToBigInt, type Bot, type User } from '../index.js'

export function transformScheduledEvent(bot: Bot, payload: DiscordScheduledEvent): ScheduledEvent {
  const props = bot.transformers.desiredProperties.scheduledEvent
  const scheduledEvent = {} as ScheduledEvent

  if (props?.id && payload.id) scheduledEvent.id = bot.transformers.snowflake(payload.id)
  if (props?.guildId && payload.guild_id) scheduledEvent.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props?.channelId && payload.channel_id) scheduledEvent.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props?.creatorId && payload.creator_id) scheduledEvent.creatorId = bot.transformers.snowflake(payload.creator_id)
  if (props?.scheduledStartTime && payload.scheduled_start_time) scheduledEvent.scheduledStartTime = Date.parse(payload.scheduled_start_time)
  if (props?.scheduledEndTime && payload.scheduled_end_time) scheduledEvent.scheduledEndTime = Date.parse(payload.scheduled_end_time)
  if (props?.entityId && payload.entity_id) scheduledEvent.entityId = bot.transformers.snowflake(payload.entity_id)
  if (props?.creator && payload.creator) scheduledEvent.creator = bot.transformers.user(bot, payload.creator)
  if (props?.name && payload.name) scheduledEvent.name = payload.name
  if (props?.description && payload.description) scheduledEvent.description = payload.description
  if (props?.privacyLevel && payload.privacy_level) scheduledEvent.privacyLevel = payload.privacy_level
  if (props?.status && payload.status) scheduledEvent.status = payload.status
  if (props?.entityType && payload.entity_type) scheduledEvent.entityType = payload.entity_type
  if (props?.userCount && payload.user_count) scheduledEvent.userCount = payload.user_count ?? 0
  if (props?.location && payload.entity_metadata?.location) scheduledEvent.location = payload.entity_metadata.location
  if (props?.image && payload.image) scheduledEvent.image = iconHashToBigInt(payload.image)

  return bot.transformers.customizers.scheduledEvent(bot, payload, scheduledEvent)
}

export interface ScheduledEvent {
  /** the id of the scheduled event */
  id: bigint
  /** the guild id which the scheduled event belongs to */
  guildId: bigint
  /** the channel id in which the scheduled event will be hosted if specified */
  channelId?: bigint
  /** the id of the user that created the scheduled event */
  creatorId?: bigint
  /** the name of the scheduled event */
  name: string
  /** the description of the scheduled event */
  description?: string
  /** the time the scheduled event will start */
  scheduledStartTime: number
  /** the time the scheduled event will end if it does end. */
  scheduledEndTime?: number
  /** the privacy level of the scheduled event */
  privacyLevel: ScheduledEventPrivacyLevel
  /** the status of the scheduled event */
  status: ScheduledEventStatus
  /** the type of hosting entity associated with a scheduled event */
  entityType: ScheduledEventEntityType
  /** any additional id of the hosting entity associated with event */
  entityId?: bigint
  /** the location for the scheduled event */
  location?: DiscordScheduledEventEntityMetadata['location']
  /** the user that created the scheduled event */
  creator?: User
  /** the number of users subscribed to the scheduled event */
  userCount?: number
  /** the cover image hash of the scheduled event */
  image?: bigint
}
