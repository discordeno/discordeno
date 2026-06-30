import type { DiscordScheduledEvent, DiscordScheduledEventRecurrenceRule } from '@discordeno/types';
import { iconHashToBigInt } from '@discordeno/utils';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { ScheduledEvent, ScheduledEventRecurrenceRule } from './types.js';

export function transformScheduledEvent(bot: Bot, payload: Partial<DiscordScheduledEvent>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.scheduledEvent;
  const scheduledEvent = {} as SetupDesiredProps<ScheduledEvent, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) scheduledEvent.id = bot.transformers.snowflake(payload.id);
  if (props.guildId && payload.guild_id) scheduledEvent.guildId = bot.transformers.snowflake(payload.guild_id);
  if (props.channelId && payload.channel_id) scheduledEvent.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.creatorId && payload.creator_id) scheduledEvent.creatorId = bot.transformers.snowflake(payload.creator_id);
  if (props.scheduledStartTime && payload.scheduled_start_time) scheduledEvent.scheduledStartTime = Date.parse(payload.scheduled_start_time);
  if (props.scheduledEndTime && payload.scheduled_end_time) scheduledEvent.scheduledEndTime = Date.parse(payload.scheduled_end_time);
  if (props.entityId && payload.entity_id) scheduledEvent.entityId = bot.transformers.snowflake(payload.entity_id);
  if (props.creator && payload.creator) scheduledEvent.creator = bot.transformers.user(bot, payload.creator);
  if (props.name && payload.name) scheduledEvent.name = payload.name;
  if (props.description && payload.description) scheduledEvent.description = payload.description;
  if (props.privacyLevel && payload.privacy_level) scheduledEvent.privacyLevel = payload.privacy_level;
  if (props.status && payload.status) scheduledEvent.status = payload.status;
  if (props.entityType && payload.entity_type) scheduledEvent.entityType = payload.entity_type;
  if (props.userCount) scheduledEvent.userCount = payload.user_count ?? 0;
  if (props.location && payload.entity_metadata?.location) scheduledEvent.location = payload.entity_metadata.location;
  if (props.image && payload.image) scheduledEvent.image = iconHashToBigInt(payload.image);
  if (props.recurrenceRule && payload.recurrence_rule)
    scheduledEvent.recurrenceRule = bot.transformers.scheduledEventRecurrenceRule(bot, payload.recurrence_rule);

  return callCustomizer('scheduledEvent', bot, payload, scheduledEvent, {
    partial: extra?.partial ?? false,
  });
}

export function transformScheduledEventRecurrenceRule(
  bot: Bot,
  payload: Partial<DiscordScheduledEventRecurrenceRule>,
  extra?: { partial?: boolean },
) {
  const props = bot.transformers.desiredProperties.scheduledEventRecurrenceRule;
  const recurrenceRule = {} as SetupDesiredProps<ScheduledEventRecurrenceRule, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.start && payload.start) recurrenceRule.start = Date.parse(payload.start);
  if (props.end && payload.end) recurrenceRule.end = Date.parse(payload.end);
  if (props.frequency && payload.frequency) recurrenceRule.frequency = payload.frequency;
  if (props.interval && payload.interval) recurrenceRule.interval = payload.interval;
  if (props.byWeekday && payload.by_weekday) recurrenceRule.byWeekday = payload.by_weekday;
  if (props.byNWeekday && payload.by_n_weekday) recurrenceRule.byNWeekday = payload.by_n_weekday;
  if (props.byMonth && payload.by_month) recurrenceRule.byMonth = payload.by_month;
  if (props.byMonthDay && payload.by_month_day) recurrenceRule.byMonthDay = payload.by_month_day;
  if (props.byYearDay && payload.by_year_day) recurrenceRule.byYearDay = payload.by_year_day;
  if (props.count && payload.count) recurrenceRule.count = payload.count;

  return callCustomizer('scheduledEventRecurrenceRule', bot, payload, recurrenceRule, {
    partial: extra?.partial ?? false,
  });
}
