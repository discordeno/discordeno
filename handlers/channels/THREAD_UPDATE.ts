import { Bot } from "../../bot.ts";
import { DiscordChannel, DiscordGatewayPayload } from "../../types/discord.ts";

export async function handleThreadUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;

  bot.events.threadUpdate(bot, bot.transformers.channel(bot, { channel: payload }));
}
