import type { DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../bot.js'

export async function handleResumed(bot: Bot, _data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.resumed) return

  bot.events.resumed(shardId)
}
