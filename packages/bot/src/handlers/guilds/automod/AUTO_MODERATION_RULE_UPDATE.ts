import type { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export async function handleAutoModerationRuleUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (bot.events.automodRuleUpdate === undefined) return

  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleUpdate(bot.transformers.automodRule(bot, payload))
}
