import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, MessageDeleteBulkPayload } from "../../types/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleMessageDeleteBulk(data: DiscordPayload) {
  const payload = data.d as MessageDeleteBulkPayload;
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
