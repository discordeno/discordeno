import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordMessageReactionRemoveEmoji } from "../../types/discord.ts";

export async function handleMessageReactionRemoveEmoji(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageReactionRemoveEmoji;

  bot.events.reactionRemoveEmoji(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  });
}
