import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import {
  DiscordGatewayPayload,
  DiscordMessageDeleteBulk,
} from "../../types/gateway.ts";

export async function handleMessageDeleteBulk(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageDeleteBulk;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  return Promise.all(payload.ids.map(async (id) => {
    eventHandlers.messageDelete?.(
      { id, channel },
      await cacheHandlers.get("messages", id),
    );
    await cacheHandlers.delete("messages", id);
  }));
}
