import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Message } from "../../types/messages/message.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Message>;

  const message = bot.transformers.message(bot, payload);
  await bot.cache.messages.set(message.id, message);

  bot.events.messageCreate(bot, message);
}
