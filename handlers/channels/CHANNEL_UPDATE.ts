import type { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  const channel = bot.transformers.channel(bot, { channel: payload });

  bot.events.channelUpdate(bot, channel);
}
