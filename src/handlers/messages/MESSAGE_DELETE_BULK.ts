import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { MessageDeleteBulk } from "../../types/messages/message_delete_bulk.ts";

export async function handleMessageDeleteBulk(data: DiscordGatewayPayload) {
  const payload = data.d as MessageDeleteBulk;
  const channel = await cacheHandlers.get("channels", payload.channelId);
  if (!channel) return;

  return Promise.all(payload.ids.map(async (id) => {
    eventHandlers.messageDelete?.(
      { id, channel },
      await cacheHandlers.get("messages", id),
    );
    await cacheHandlers.delete("messages", id);
  }));
}
