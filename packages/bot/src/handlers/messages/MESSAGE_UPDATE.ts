import type { DiscordGatewayPayload, DiscordMessage } from '@discordeno/types'
import type { Bot } from '../../index.js'

export async function handleMessageUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.messageUpdate) return

  const payload = data.d as DiscordMessage
  if (!payload.edited_timestamp) return

  bot.events.messageUpdate(bot.transformers.message(bot, { message: payload, shardId }))
}
