import type { DiscordScheduledEvent, Optionalize } from '@discordeno/types'
import { iconHashToBigInt } from '@discordeno/utils'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformScheduledEvent (
  rest: RestManager,
  payload: DiscordScheduledEvent
) {
  const scheduledEvent = {
    id: rest.transformers.snowflake(payload.id),
    guildId: rest.transformers.snowflake(payload.guild_id),
    channelId: payload.channel_id
      ? rest.transformers.snowflake(payload.channel_id)
      : undefined,
    creatorId: payload.creator_id
      ? rest.transformers.snowflake(payload.creator_id)
      : 0n,
    scheduledStartTime: Date.parse(payload.scheduled_start_time),
    scheduledEndTime: payload.scheduled_end_time
      ? Date.parse(payload.scheduled_end_time)
      : undefined,
    entityId: payload.entity_id
      ? rest.transformers.snowflake(payload.entity_id)
      : undefined,
    creator: payload.creator
      ? rest.transformers.user(rest, payload.creator)
      : undefined,

    name: payload.name,
    description: payload.description,
    privacyLevel: payload.privacy_level,
    status: payload.status,
    entityType: payload.entity_type,
    userCount: payload.user_count ?? 0,
    location: payload.entity_metadata?.location,
    image: payload.image ? iconHashToBigInt(payload.image) : undefined
  }

  return scheduledEvent as Optionalize<typeof scheduledEvent>
}

export interface ScheduledEvent
  extends ReturnType<typeof transformScheduledEvent> {}
