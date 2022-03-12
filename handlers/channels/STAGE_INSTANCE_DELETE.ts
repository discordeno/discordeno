import type { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordStageInstance } from "../../types/discord.ts";

export function handleStageInstanceDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordStageInstance;

  bot.events.stageInstanceDelete(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    topic: payload.topic,
  });
}
