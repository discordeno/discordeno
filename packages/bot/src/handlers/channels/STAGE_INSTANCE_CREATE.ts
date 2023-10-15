import type { DiscordGatewayPayload, DiscordStageInstance } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleStageInstanceCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.stageInstanceCreate) return

  const payload = data.d as DiscordStageInstance

  bot.events.stageInstanceCreate({
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
  })
}
