import type { Bot } from "../../../bot.ts";
import { DiscordAutoModerationActionExecution, DiscordGatewayPayload } from "../../../types/discord.ts";

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationActionExecution(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationActionExecution;
  bot.events.automodActionExecution(bot, bot.transformers.automodActionExecution(bot, payload));
}
