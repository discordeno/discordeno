import { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleThreadCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;

  bot.events.threadCreate(bot, bot.transformers.channel(bot, { channel: payload }));
}
