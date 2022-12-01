import {
  DiscordGatewayPayload,
  DiscordScheduledEvent
} from '@discordeno/types'
import type { Bot } from '../../../bot.js'

export function handleGuildScheduledEventCreate (
  bot: Bot,
  data: DiscordGatewayPayload,
  shardId: number
): void {
  const payload = data.d as DiscordScheduledEvent
  bot.events.scheduledEventCreate(
    bot,
    bot.transformers.scheduledEvent(bot, payload)
  )
}
