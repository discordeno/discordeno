import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Message } from "../../types/messages/message.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Message>;
  bot.events.messageUpdate(bot, bot.transformers.message(bot, payload));
}
