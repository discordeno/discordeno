import { DiscordAutoModerationRule, DiscordGatewayPayload } from '@discordeno/types'
import type { Bot } from '../../../bot.js'

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleUpdate (bot: Bot, data: DiscordGatewayPayload, shardId: number): void {
  const payload = data.d as DiscordAutoModerationRule
  bot.events.automodRuleUpdate(bot, bot.transformers.automodRule(bot, payload))
}
