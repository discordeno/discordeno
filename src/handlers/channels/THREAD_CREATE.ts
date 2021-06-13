import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { channelToThread } from "../../util/channel_to_thread.ts";

export async function handleThreadCreate(data: DiscordGatewayPayload) {
  const payload = data.d as Channel;

  const thread = channelToThread(payload);
  await cacheHandlers.set("threads", thread.id, thread);

  eventHandlers.threadCreate?.(thread);
}
