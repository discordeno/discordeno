import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { MessageReactionRemove } from "../../types/messages/messageReactionRemove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageReactionRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageReactionRemove>;

  bot.events.reactionRemove(bot, {
    userId: bot.transformers.snowflake(payload.user_id),
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  });
}
