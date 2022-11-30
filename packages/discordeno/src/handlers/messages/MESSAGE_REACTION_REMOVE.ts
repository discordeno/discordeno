import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordMessageReactionRemove } from "../../types/discord.ts";

export async function handleMessageReactionRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageReactionRemove;

  bot.events.reactionRemove(bot, {
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  });
}
