import { ScheduledEvent } from "../../../types/guilds/scheduledEvents.ts";
import type { Bot } from "../../../bot.ts";
import type { DiscordGatewayPayload } from "../../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../../types/util.ts";

export function handleGuildScheduledEventCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<ScheduledEvent>;
  bot.events.scheduledEventCreate(bot, bot.transformers.scheduledEvent(bot, payload));
}
