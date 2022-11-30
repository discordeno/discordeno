import type { Bot } from "../../../bot.ts";
import { DiscordGatewayPayload, DiscordScheduledEvent } from "../../../types/discord.ts";

export function handleGuildScheduledEventUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordScheduledEvent;
  bot.events.scheduledEventUpdate(bot, bot.transformers.scheduledEvent(bot, payload));
}
