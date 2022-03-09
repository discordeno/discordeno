import { Bot } from "../../bot.ts";
import { DiscordUser } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleUserUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordUser;
  bot.events.botUpdate(bot, bot.transformers.user(bot, payload));
}
