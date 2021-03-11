import { botID, eventHandlers } from "../../bot.ts";
import {
  DiscordPayload,
  MessageReactionRemoveEmojiPayload,
} from "../../types/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleMessageReactionRemoveEmoji(
  data: DiscordPayload,
) {
  const payload = data.d as MessageReactionRemoveEmojiPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = message.reactions?.filter(
      (reaction) =>
        !(
          reaction.emoji.id === payload.emoji.id &&
          reaction.emoji.name === payload.emoji.name
        ),
    );

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveEmoji?.(
    data.d as MessageReactionRemoveEmojiPayload,
  );
}
