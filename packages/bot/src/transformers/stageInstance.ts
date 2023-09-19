import type { DiscordStageInstance } from '@discordeno/types'
import type { Bot } from '../index.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformStageInstance(bot: Bot, payload: DiscordStageInstance) {
  const props = bot.transformers.desiredProperties.stageInstance
  const stageInstance = {} as StageInstance

  if (props.id) stageInstance.id = bot.transformers.snowflake(payload.id)
  if (props.guildId) stageInstance.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.channelId) stageInstance.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.topic) stageInstance.topic = payload.topic
  if (props.guildScheduledEventId && payload.guild_scheduled_event_id)
    stageInstance.guildScheduledEventId = bot.transformers.snowflake(payload.guild_scheduled_event_id)

  return stageInstance
}

export interface StageInstance {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The id of this Stage instance */
  id: bigint
  /** The guild id of the associated Stage channel */
  guildId: bigint
  /** The id of the associated Stage channel */
  channelId: bigint
  /** The id of the scheduled event for this Stage instance */
  guildScheduledEventId?: bigint
}
