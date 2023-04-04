import type { DiscordScheduledEvent } from '@discordeno/types'
import { iconHashToBigInt, type Bot } from '../index.js'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformScheduledEvent(bot: Bot, payload: DiscordScheduledEvent) {
  const scheduledEvent = {
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
    userCount: payload.user_count ?? 0,
    location: payload.entity_metadata?.location,
    image: payload.image ? iconHashToBigInt(payload.image) : undefined,
  }

  return scheduledEvent as Optionalize<typeof scheduledEvent>
}

export interface ScheduledEvent extends ReturnType<typeof transformScheduledEvent> {}
