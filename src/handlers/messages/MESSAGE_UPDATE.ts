import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Message } from "../../types/messages/message.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Message>;
  if (!payload.edited_timestamp) return;

  const message = bot.transformers.message(bot, payload);

  // GET OLD CACHED MESSAGE IF ONE WAS CACHED
  const oldMessage = await bot.cache.messages.get(message.id);
  if (oldMessage?.content === message.content) return;

  await bot.cache.messages.set(message.id, message);
  bot.events.messageUpdate(bot, message, oldMessage);
}
