import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordMessage } from "../../types/messages/message.ts";

export async function handleMessageUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessage;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (!channel) return;

  const oldMessage = await cacheHandlers.get("messages", payload.id);
  if (!oldMessage) return;

  // Messages with embeds can trigger update but they wont have edited_timestamp
  if (
    !payload.edited_timestamp ||
    (oldMessage.content === payload.content)
  ) {
    return;
  }

  const message = await structures.createDiscordenoMessage(payload);

  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageUpdate?.(message, oldMessage);
}
