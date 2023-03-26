import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleThreadDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  const payload = data.d as DiscordChannel

  bot.events.threadDelete?.(bot.transformers.channel(bot, { channel: payload }))
}
