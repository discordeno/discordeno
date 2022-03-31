import { Bot } from "../../bot.ts";
import { DiscordChannel, DiscordGatewayPayload } from "../../types/discord.ts";

export async function handleThreadDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  bot.events.threadDelete(bot, bot.transformers.channel(bot, { channel: payload }));
}
