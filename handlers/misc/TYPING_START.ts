import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordTypingStart } from "../../types/discord.ts";

export function handleTypingStart(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordTypingStart;

  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const userId = bot.transformers.snowflake(payload.user_id);

  bot.events.typingStart(bot, {
    guildId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    userId,
    timestamp: payload.timestamp,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
  });
}
