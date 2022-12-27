import type { DiscordStageInstance, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformStageInstance (
  client: Client,
  payload: DiscordStageInstance
) {
  const stageInstance = {
    id: client.transformers.snowflake(payload.id),
    guildId: client.transformers.snowflake(payload.guild_id),
    channelId: client.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
    guildScheduledEventId: payload.guild_scheduled_event_id
      ? client.transformers.snowflake(payload.guild_scheduled_event_id)
      : undefined
  }

  return stageInstance as Optionalize<typeof stageInstance>
}

export interface StageInstance
  extends ReturnType<typeof transformStageInstance> {}
