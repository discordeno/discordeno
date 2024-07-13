import type { DiscordScheduledEvent } from '@discordeno/types'
import { type Bot, type ScheduledEvent, iconHashToBigInt } from '../index.js'

export function transformScheduledEvent(bot: Bot, payload: DiscordScheduledEvent): ScheduledEvent {
  const props = bot.transformers.desiredProperties.scheduledEvent
  const scheduledEvent = {} as ScheduledEvent

  if (props.id && payload.id) scheduledEvent.id = bot.transformers.snowflake(payload.id)
  if (props.guildId && payload.guild_id) scheduledEvent.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.channelId && payload.channel_id) scheduledEvent.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.creatorId && payload.creator_id) scheduledEvent.creatorId = bot.transformers.snowflake(payload.creator_id)
  if (props.scheduledStartTime && payload.scheduled_start_time) scheduledEvent.scheduledStartTime = Date.parse(payload.scheduled_start_time)
  if (props.scheduledEndTime && payload.scheduled_end_time) scheduledEvent.scheduledEndTime = Date.parse(payload.scheduled_end_time)
  if (props.entityId && payload.entity_id) scheduledEvent.entityId = bot.transformers.snowflake(payload.entity_id)
  if (props.creator && payload.creator) scheduledEvent.creator = bot.transformers.user(bot, payload.creator)
  if (props.name && payload.name) scheduledEvent.name = payload.name
  if (props.description && payload.description) scheduledEvent.description = payload.description
  if (props.privacyLevel && payload.privacy_level) scheduledEvent.privacyLevel = payload.privacy_level
  if (props.status && payload.status) scheduledEvent.status = payload.status
  if (props.entityType && payload.entity_type) scheduledEvent.entityType = payload.entity_type
  if (props.userCount) scheduledEvent.userCount = payload.user_count ?? 0
  if (props.location && payload.entity_metadata?.location) scheduledEvent.location = payload.entity_metadata.location
  if (props.image && payload.image) scheduledEvent.image = iconHashToBigInt(payload.image)

  return bot.transformers.customizers.scheduledEvent(bot, payload, scheduledEvent)
}
