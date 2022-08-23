import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordMessage } from "../../types/discord.ts";

export async function handleMessageUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage;
  if (!payload.edited_timestamp) return;

  bot.events.messageUpdate(bot, bot.transformers.message(bot, payload));
}
