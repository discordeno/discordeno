import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageReactionAdd } from "../../types/messages/message_reaction_add.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageReactionAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageReactionAdd>;

  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
  const userId =  bot.transformers.snowflake(payload.user_id)
  bot.events.reactionAdd(bot, {
    userId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    emoji: bot.transformers.emoji(bot, payload.emoji),
  });
}
