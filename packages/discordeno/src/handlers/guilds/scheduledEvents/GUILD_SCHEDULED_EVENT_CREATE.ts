import type { Bot } from '../../../bot.js'
import { DiscordGatewayPayload, DiscordScheduledEvent } from '../../../types/discord.js'

export function handleGuildScheduledEventCreate (bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordScheduledEvent
  bot.events.scheduledEventCreate(bot, bot.transformers.scheduledEvent(bot, payload))
}
