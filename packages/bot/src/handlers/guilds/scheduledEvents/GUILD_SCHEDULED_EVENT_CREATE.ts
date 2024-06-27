import type { DiscordGatewayPayload, DiscordScheduledEvent } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

export async function handleGuildScheduledEventCreate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.scheduledEventCreate) return

  const payload = data.d as DiscordScheduledEvent
  bot.events.scheduledEventCreate(bot.transformers.scheduledEvent(bot, payload))
}
