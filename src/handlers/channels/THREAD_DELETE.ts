import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleThreadDelete(data: DiscordGatewayPayload) {
  const payload = data.d as Channel;

  const cachedChannel = await cacheHandlers.get("channels", payload.id);
  if (!cachedChannel) return;

  await cacheHandlers.delete("channels", payload.id);
  cacheHandlers.forEach("messages", (message) => {
    eventHandlers.debug?.(
      "loop",
      `Running forEach messages loop in CHANNEL_DELTE file.`,
    );
    if (message.channelId === payload.id) {
      cacheHandlers.delete("messages", message.id);
    }
  });

  eventHandlers.threadDelete?.(cachedChannel);
}
