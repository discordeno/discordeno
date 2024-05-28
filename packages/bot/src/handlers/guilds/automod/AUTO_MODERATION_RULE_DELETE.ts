import type { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export async function handleAutoModerationRuleDelete(bot: Bot, data: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.automodRuleDelete) return

  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleDelete(bot.transformers.automodRule(bot, payload))
}
