import { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleMessageCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage;

  bot.events.messageCreate(bot, bot.transformers.message(bot, payload));
}
