import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageDeleteBulk } from "../../types/messages/message_delete_bulk.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageDeleteBulk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageDeleteBulk>;

  return {
    ids: payload.ids.map((id) => bot.transformers.snowflake(id)),
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
  };
}
