import type { DiscordGatewayPayload, DiscordRateLimited } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleRateLimited(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.rateLimited) return

  const payload = data.d as DiscordRateLimited
  bot.events.rateLimited(payload, shardId)
}
