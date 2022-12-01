import { DiscordGatewayPayload, DiscordScheduledEvent } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

export function handleGuildScheduledEventDelete (bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordScheduledEvent
  bot.events.scheduledEventDelete(bot, bot.transformers.scheduledEvent(bot, payload))
}
