import { Bot } from '../bot.js'
import { DiscordStageInstance } from '../types/discord.js'
import { Optionalize } from '../types/shared.js'

export function transformStageInstance(bot: Bot, payload: DiscordStageInstance) {
  const stageInstance = {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
    guildScheduledEventId: payload.guild_scheduled_event_id
      ? bot.transformers.snowflake(payload.guild_scheduled_event_id)
      : undefined
  }

  return stageInstance as Optionalize<typeof stageInstance>
}

export interface StageInstance extends ReturnType<typeof transformStageInstance> { }
