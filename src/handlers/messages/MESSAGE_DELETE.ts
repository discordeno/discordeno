import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordMessageDelete } from "../../types/messages/message_delete.ts";

export async function handleMessageDelete(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageDelete;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  eventHandlers.messageDelete?.(
    { id: payload.id, channel },
    await cacheHandlers.get("messages", payload.id),
  );

  await cacheHandlers.delete("messages", payload.id);
}
