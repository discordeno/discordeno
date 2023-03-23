import type { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleDelete?.(bot.events.automodRule(payload))
}
