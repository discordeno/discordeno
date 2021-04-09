import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleChannelUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  const cachedChannel = await cacheHandlers.get("channels", payload.id);

  const discordenoChannel = await structures.createDiscordenoChannel(payload);
  await cacheHandlers.set("channels", discordenoChannel.id, discordenoChannel);

  if (!cachedChannel) return;

  eventHandlers.channelUpdate?.(discordenoChannel, cachedChannel);
}
