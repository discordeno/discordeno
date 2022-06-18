import { Bot } from "../../bot.ts";
import { DiscordChannel, DiscordGatewayPayload } from "../../deps.ts";

export async function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  const channel = bot.transformers.channel(bot, { channel: payload });

  bot.events.channelUpdate(bot, channel);
}
