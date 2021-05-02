import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleThreadUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as Channel;
  const oldChannel = await cacheHandlers.get("channels", payload.id);
  if (!oldChannel) return;

  const discordenoChannel = await structures.createDiscordenoChannel(payload);
  await cacheHandlers.set("channels", discordenoChannel.id, discordenoChannel);

  eventHandlers.threadUpdate?.(discordenoChannel, oldChannel);
}
