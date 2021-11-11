import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageReactionRemoveEmoji } from "../../types/messages/message_reaction_remove_emoji.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageReactionRemoveEmoji(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageReactionRemoveEmoji>;

  bot.events.reactionRemoveEmoji(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  });
}
