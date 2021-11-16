import { ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";
import type { Bot } from "../../../bot.ts";
import type { DiscordGatewayPayload } from "../../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../../types/util.ts";

export function handleGuildScheduledEventDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<ScheduledEvent>;
  bot.events.scheduledEventDelete(bot, bot.transformers.scheduledEvent(bot, payload));
}
