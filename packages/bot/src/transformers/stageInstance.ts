import type { DiscordStageInstance } from '@discordeno/types'
import type { Bot, StageInstance } from '../index.js'

export function transformStageInstance(bot: Bot, payload: DiscordStageInstance): StageInstance {
  const props = bot.transformers.desiredProperties.stageInstance
  const stageInstance = {} as StageInstance

  if (props.id && payload.id) stageInstance.id = bot.transformers.snowflake(payload.id)
  if (props.guildId && payload.guild_id) stageInstance.guildId = bot.transformers.snowflake(payload.guild_id)
  if (props.channelId && payload.channel_id) stageInstance.channelId = bot.transformers.snowflake(payload.channel_id)
  if (props.topic && payload.topic) stageInstance.topic = payload.topic
  if (props.guildScheduledEventId && payload.guild_scheduled_event_id)
    stageInstance.guildScheduledEventId = bot.transformers.snowflake(payload.guild_scheduled_event_id)

  return bot.transformers.customizers.stageInstance(bot, payload, stageInstance)
}
