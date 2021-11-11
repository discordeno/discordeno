import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Message } from "../../types/messages/message.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Message>;

  bot.events.messageCreate(bot, bot.transformers.message(bot, payload));
}
