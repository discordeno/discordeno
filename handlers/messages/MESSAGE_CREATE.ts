import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordMessage } from "../../types/discord.ts";

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage;

  bot.events.messageCreate(bot, bot.transformers.message(bot, payload));
}
