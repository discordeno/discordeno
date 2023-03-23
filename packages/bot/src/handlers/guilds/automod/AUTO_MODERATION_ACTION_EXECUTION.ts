import type { DiscordAutoModerationActionExecution, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationActionExecution(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationActionExecution
  bot.events.automodActionExecution?.(bot.events.automodActionExecution(payload))
}
