import { DiscordScheduledEvent, Optionalize } from '@discordeno/types'
import { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformScheduledEvent (
  client: Client,
  payload: DiscordScheduledEvent
) {
  const scheduledEvent = {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    channelId: payload.channel_id
      ? client.transformers.snowflake(payload.channel_id)
      : undefined,
    creatorId: payload.creator_id
      ? client.transformers.snowflake(payload.creator_id)
      : 0n,
    scheduledStartTime: Date.parse(payload.scheduled_start_time),
    scheduledEndTime: payload.scheduled_end_time
      ? Date.parse(payload.scheduled_end_time)
      : undefined,
    entityId: payload.entity_id
      ? client.transformers.snowflake(payload.entity_id)
      : undefined,
    creator: payload.creator
      ? client.transformers.user(client, payload.creator)
      : undefined,

    name: payload.name,
    description: payload.description,
    privacyLevel: payload.privacy_level,
    status: payload.status,
    entityType: payload.entity_type,
    userCount: payload.user_count ?? 0,
    location: payload.entity_metadata?.location,
    image: payload.image
      ? client.utils.iconHashToBigInt(payload.image)
      : undefined
  }

  return scheduledEvent as Optionalize<typeof scheduledEvent>
}

export interface ScheduledEvent
  extends ReturnType<typeof transformScheduledEvent> {}
