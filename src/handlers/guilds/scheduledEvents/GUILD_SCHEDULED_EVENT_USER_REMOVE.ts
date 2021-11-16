import type { Bot } from "../../../bot.ts";
import type { DiscordGatewayPayload } from "../../../types/gateway/gatewayPayload.ts";
import { ScheduledEventUserRemove } from "../../../types/guilds/scheduledEvents.ts";
import { SnakeCasedPropertiesDeep } from "../../../types/util.ts";

export function handleGuildScheduledEventUserRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<ScheduledEventUserRemove>;

  return bot.events.scheduledEventUserRemove(bot, {
    guildScheduledEventId: bot.transformers.snowflake(payload.guild_scheduled_event_id),
    userId: bot.transformers.snowflake(payload.user_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
