import type { Camelize, DiscordScheduledEvent } from '@discordeno/types'
import TRANSFORMERS from '../index.js'

export function c1amelize1ScheduledEvent (payload: DiscordScheduledEvent): Camelize<DiscordScheduledEvent> {
  return {
    id: payload.id,
    name: payload.name,
    image: payload.image,
    status: payload.status,
    description: payload.description,

    creator: payload.creator && TRANSFORMERS.user(payload.creator),

    guildId: payload.guild_id,
    entityId: payload.entity_id,
    channelId: payload.channel_id,
    creatorId: payload.creator_id,
    userCount: payload.user_count,
    entityType: payload.entity_type,
    privacyLevel: payload.privacy_level,
    scheduledEndTime: payload.scheduled_end_time,
    scheduledStartTime: payload.scheduled_start_time,

    entityMetadata: payload.entity_metadata && {
      location: payload.entity_metadata.location
    }
  }
}
