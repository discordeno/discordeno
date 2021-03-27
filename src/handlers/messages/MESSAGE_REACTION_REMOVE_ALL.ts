import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import {
  DiscordGatewayPayload,
  DiscordMessageReactionRemoveAll,
} from "../../types/gateway.ts";

export async function handleMessageReactionRemoveAll(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as DiscordMessageReactionRemoveAll;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = undefined;

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveAll?.(data.d);
}
