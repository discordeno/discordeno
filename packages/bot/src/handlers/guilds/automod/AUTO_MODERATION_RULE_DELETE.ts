import { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleDelete (bot: Bot, data: DiscordGatewayPayload, shardId: number): void {
  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleDelete(bot, bot.transformers.automodRule(bot, payload))
}
