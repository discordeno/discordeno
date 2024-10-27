import type { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.messageCreate) return

  const payload = data.d as DiscordMessage

  bot.events.messageCreate(bot.transformers.message(bot, { message: payload, shardId }))
}
