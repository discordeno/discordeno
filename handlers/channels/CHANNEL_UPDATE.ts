import type { Bot } from "../../bot.ts";
import type { Channel } from "../../types/channels/channel.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;
  const channel = bot.transformers.channel(bot, { channel: payload });

  bot.events.channelUpdate(bot, channel);
}
