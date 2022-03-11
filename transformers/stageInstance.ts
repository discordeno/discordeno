import { Bot } from "../bot.ts";
import { DiscordStageInstance } from "../types/discord.ts";

export function transformStageInstance(
  bot: Bot,
  payload: DiscordStageInstance,
) {
  return {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
  };
}

export interface StageInstance extends ReturnType<typeof transformStageInstance> {};
