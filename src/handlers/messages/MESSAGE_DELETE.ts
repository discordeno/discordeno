import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageDelete } from "../../types/messages/message_delete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageDelete>;
  const id = bot.transformers.snowflake(payload.id);

  bot.events.messageDelete(bot,
    {
      id,
      channelId: bot.transformers.snowflake(payload.channel_id),
      guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    },
    await bot.cache.messages.get(id)
  );

  await bot.cache.messages.delete(id);
}
