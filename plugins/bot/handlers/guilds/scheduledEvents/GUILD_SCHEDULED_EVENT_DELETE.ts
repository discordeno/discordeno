import { Bot } from "../../../bot.ts";
import { DiscordGatewayPayload, DiscordScheduledEvent } from "../../../deps.ts";

export function handleGuildScheduledEventDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordScheduledEvent;
  bot.events.scheduledEventDelete(bot, bot.transformers.scheduledEvent(bot, payload));
}
