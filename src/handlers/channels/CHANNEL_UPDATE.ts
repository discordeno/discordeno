import { eventHandlers } from "../../bot.ts";
import { ChannelCreatePayload, DiscordPayload } from "../../types/mod.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleChannelUpdate(data: DiscordPayload) {
  const payload = data.d as ChannelCreatePayload;
  const cachedChannel = await cacheHandlers.get("channels", payload.id);

  const channelStruct = await structures.createChannelStruct(payload);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  if (!cachedChannel) return;

  eventHandlers.channelUpdate?.(channelStruct, cachedChannel);
}
