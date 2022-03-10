import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../types/discord.ts";

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload) {
  const channel = bot.transformers.channel(bot, { channel: payload.d as DiscordChannel });

  bot.events.channelCreate(bot, channel);
}
