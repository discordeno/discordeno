import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleChannelUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;
  const cachedChannel = await cacheHandlers.get("channels", payload.id);

  const channelStruct = await structures.createChannelStruct(payload);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  if (!cachedChannel) return;

  eventHandlers.channelUpdate?.(channelStruct, cachedChannel);
}
