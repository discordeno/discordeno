import type { Bot } from "../../bot.ts";
import type { Channel } from "../../types/channels/channel.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleChannelUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;

  const cachedChannel = await bot.cache.channels.get(bot.transformers.snowflake(payload.id));
  if (!cachedChannel) return;

  const channel = bot.transformers.channel(bot, { channel: payload });
  await bot.cache.channels.set(channel.id, channel);

  bot.events.channelUpdate(bot, channel, cachedChannel);
}
