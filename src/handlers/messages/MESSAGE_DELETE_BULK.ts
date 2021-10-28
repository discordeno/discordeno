import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { MessageDeleteBulk } from "../../types/messages/message_delete_bulk.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageDeleteBulk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<MessageDeleteBulk>;

  const ids = payload.ids.map((id) => bot.transformers.snowflake(id));
  const messages = await bot.cache.execute("BULK_DELETE_MESSAGES", { messageIds: ids });

  ids.forEach((id) => {
    // @ts-ignore let itoh fix cache typings hes the king of typigns and cache
    const msg = messages.find((m) => m.id === id);
    const message = msg ? bot.transformers.message(bot, msg) : undefined;

    bot.events.messageDelete(
      bot,
      {
        id,
        channelId: bot.transformers.snowflake(payload.channel_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
      },
      message  
    );
  });
}
