import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordMessageReactionRemoveAll } from "../../types/messages/message_reaction_remove_all.ts";

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
