import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleMessageReactionRemoveEmoji(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as DiscordMessageReactionRemoveEmoji;
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
    data.d,
  );
}
