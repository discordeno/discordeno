import type { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage

  bot.events.messageCreate?.(bot.events.message(payload))
}
