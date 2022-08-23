import type { Bot } from "../../../bot.ts";
import { DiscordGatewayPayload, DiscordScheduledEvent } from "../../../types/discord.ts";

export function handleGuildScheduledEventCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordScheduledEvent;
  bot.events.scheduledEventCreate(bot, bot.transformers.scheduledEvent(bot, payload));
}
