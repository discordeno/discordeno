import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { MessageReactionRemoveAll } from "../../types/messages/messageReactionRemoveAll.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageReactionRemoveAll(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageReactionRemoveAll>;

  bot.events.reactionRemoveAll(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    messageId: bot.transformers.snowflake(payload.message_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  });
}
