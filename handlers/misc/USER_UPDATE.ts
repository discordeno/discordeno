import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordUser } from "../../types/discord.ts";

export async function handleUserUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordUser;
  bot.events.botUpdate(bot, bot.transformers.user(bot, payload));
}
