import type { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export async function handleAutoModerationRuleCreate(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.automodRuleCreate) return

  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleCreate(bot.transformers.automodRule(bot, payload))
}
