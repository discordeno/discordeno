import type { Channel } from "../../types/channels/channel.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

import type { Bot } from "../../bot.ts";

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload) {
  const channel = bot.transformers.channel(bot, { channel: payload.d as SnakeCasedPropertiesDeep<Channel> });

  bot.events.channelCreate(bot, channel);
}
