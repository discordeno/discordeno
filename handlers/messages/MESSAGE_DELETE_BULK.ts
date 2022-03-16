import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { MessageDeleteBulk } from "../../types/messages/messageDeleteBulk.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageDeleteBulk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageDeleteBulk>;

  payload.ids.forEach((id) =>
    bot.events.messageDelete(bot, {
      id: bot.transformers.snowflake(id),
      channelId: bot.transformers.snowflake(payload.channel_id),
      guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    })
  );
}
