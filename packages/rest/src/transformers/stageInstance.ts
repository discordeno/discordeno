import { DiscordStageInstance, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformStageInstance (
  rest: RestManager,
  payload: DiscordStageInstance
) {
  const stageInstance = {
    id: rest.transformers.snowflake(payload.id),
    guildId: rest.transformers.snowflake(payload.guild_id),
    channelId: rest.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
    guildScheduledEventId: payload.guild_scheduled_event_id
      ? rest.transformers.snowflake(payload.guild_scheduled_event_id)
      : undefined
  }

  return stageInstance as Optionalize<typeof stageInstance>
}

export interface StageInstance
  extends ReturnType<typeof transformStageInstance> {}
