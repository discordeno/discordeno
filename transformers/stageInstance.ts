import { Bot } from "../bot.ts";
import { DiscordStageInstance } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformStageInstance(
  bot: Bot,
  payload: DiscordStageInstance,
) {
  return {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
    guildScheduledEventId: payload.guild_scheduled_event_id
      ? bot.transformers.snowflake(payload.guild_scheduled_event_id)
      : undefined,
  };
}

export interface StageInstance extends Optionalize<ReturnType<typeof transformStageInstance>> {}
