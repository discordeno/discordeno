import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleMessageReactionRemoveAll(
  data: DiscordPayload,
) {
  const payload = data.d as BaseMessageReactionPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = undefined;

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveAll?.(data.d as BaseMessageReactionPayload);
}
