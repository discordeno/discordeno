import { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleMessageUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage;
  if (!payload.edited_timestamp) return;

  bot.events.messageUpdate(bot, bot.transformers.message(bot, payload));
}
