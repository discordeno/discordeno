import type { DiscordGatewayPayload, DiscordUser } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleUserUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.botUpdate) return

  const payload = data.d as DiscordUser
  bot.events.botUpdate(bot.transformers.user(bot, payload))
}
