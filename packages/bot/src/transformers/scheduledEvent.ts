import type { DiscordScheduledEvent, DiscordScheduledEventRecurrenceRule } from '@discordeno/types'
import { type InternalBot, type ScheduledEvent, type ScheduledEventRecurrenceRule, iconHashToBigInt } from '../index.js'

export function transformScheduledEvent(bot: InternalBot, payload: DiscordScheduledEvent): typeof bot.transformers.$inferredTypes.scheduledEvent {
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
  if (props.recurrenceRule && payload.recurrence_rule)
    scheduledEvent.recurrenceRule = bot.transformers.scheduledEventRecurrenceRule(bot, payload.recurrence_rule)

  return bot.transformers.customizers.scheduledEvent(bot, payload, scheduledEvent)
}

export function transformScheduledEventRecurrenceRule(
  bot: InternalBot,
  payload: DiscordScheduledEventRecurrenceRule,
): typeof bot.transformers.$inferredTypes.scheduledEventRecurrenceRule {
  const props = bot.transformers.desiredProperties.scheduledEventRecurrenceRule
  const recurrenceRule = {} as ScheduledEventRecurrenceRule

  if (props.start && payload.start) recurrenceRule.start = Date.parse(payload.start)
  if (props.end && payload.end) recurrenceRule.end = Date.parse(payload.end)
  if (props.frequency && payload.frequency) recurrenceRule.frequency = payload.frequency
  if (props.interval && payload.interval) recurrenceRule.interval = payload.interval
  if (props.byWeekday && payload.by_weekday) recurrenceRule.byWeekday = payload.by_weekday
  if (props.byNWeekday && payload.by_n_weekday) recurrenceRule.byNWeekday = payload.by_n_weekday
  if (props.byMonth && payload.by_month) recurrenceRule.byMonth = payload.by_month
  if (props.byMonthDay && payload.by_month_day) recurrenceRule.byMonthDay = payload.by_month_day
  if (props.byYearDay && payload.by_year_day) recurrenceRule.byYearDay = payload.by_year_day
  if (props.count && payload.count) recurrenceRule.count = payload.count

  return bot.transformers.customizers.scheduledEventRecurrenceRule(bot, payload, recurrenceRule)
}
