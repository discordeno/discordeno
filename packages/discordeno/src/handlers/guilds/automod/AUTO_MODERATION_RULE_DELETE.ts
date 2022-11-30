import type { Bot } from "../../../bot.ts";
import { DiscordAutoModerationRule, DiscordGatewayPayload } from "../../../types/discord.ts";

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationRule;
  bot.events.automodRuleDelete(bot, bot.transformers.automodRule(bot, payload));
}
