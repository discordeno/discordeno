import type { DiscordAutoModerationActionExecution, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export async function handleAutoModerationActionExecution(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.automodActionExecution) return

  const payload = data.d as DiscordAutoModerationActionExecution
  bot.events.automodActionExecution(bot.transformers.automodActionExecution(bot, payload))
}
