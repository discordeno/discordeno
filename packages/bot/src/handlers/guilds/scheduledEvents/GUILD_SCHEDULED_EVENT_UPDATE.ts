import {
  DiscordGatewayPayload,
  DiscordScheduledEvent
} from '@discordeno/types'
import type { Bot } from '../../../bot.js'

export function handleGuildScheduledEventUpdate (
  bot: Bot,
  data: DiscordGatewayPayload
): void {
  const payload = data.d as DiscordScheduledEvent
  bot.events.scheduledEventUpdate(
    bot,
    bot.transformers.scheduledEvent(bot, payload)
  )
}
