import { DiscordGatewayPayload, DiscordStageInstance } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export function handleStageInstanceCreate (
  bot: Bot,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordStageInstance

  bot.events.stageInstanceCreate(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic
  })
}
