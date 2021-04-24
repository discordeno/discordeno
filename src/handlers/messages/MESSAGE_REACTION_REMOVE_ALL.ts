import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  MessageReactionRemoveAll,
} from "../../types/messages/message_reaction_remove_all.ts";

export async function handleMessageReactionRemoveAll(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as MessageReactionRemoveAll;
  const message = await cacheHandlers.get("messages", payload.messageId);

  if (message?.reactions) {
    message.reactions = undefined;

    await cacheHandlers.set("messages", payload.messageId, message);
  }

  eventHandlers.reactionRemoveAll?.(
    payload,
    message,
  );
}
