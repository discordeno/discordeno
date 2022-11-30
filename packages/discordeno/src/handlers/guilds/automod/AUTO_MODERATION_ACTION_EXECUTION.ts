import type { Bot } from '../../../bot.js'
import { DiscordAutoModerationActionExecution, DiscordGatewayPayload } from '../../../types/discord.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationActionExecution(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationActionExecution
  bot.events.automodActionExecution(bot, bot.transformers.automodActionExecution(bot, payload))
}
