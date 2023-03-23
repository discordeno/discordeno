import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleThreadUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel

  bot.events.threadUpdate?.(bot.transformers.channel(bot, { channel: payload }))
}
