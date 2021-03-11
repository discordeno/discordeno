import { eventHandlers } from "../../../bot.ts";
import { ChannelCreatePayload, DiscordPayload } from "../../../types/mod.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../cache.ts";

export async function handleChannelCreate(data: DiscordPayload) {
  const payload = data.d as ChannelCreatePayload;

  const channelStruct = await structures.createChannelStruct(payload);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  eventHandlers.channelCreate?.(channelStruct);
}
