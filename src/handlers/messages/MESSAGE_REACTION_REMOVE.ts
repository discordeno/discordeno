import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordMessageReactionRemove } from "../../types/messages/message_reaction_remove.ts";

export async function handleMessageReactionRemove(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as DiscordMessageReactionRemove;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message) {
    const reaction = message.reactions?.find((reaction) =>
      reaction.emoji.id === payload.emoji.id &&
      reaction.emoji.name === payload.emoji.name
    );

    if (reaction) {
      reaction.count--;
      await cacheHandlers.set("messages", payload.message_id, message);
    }
  }

  const uncachedOptions = {
    ...payload,
    id: payload.message_id,
    channelId: payload.channel_id,
    guildId: payload.guild_id,
  };

  eventHandlers.reactionRemove?.(
    uncachedOptions,
    payload.emoji,
    payload.user_id,
    message,
  );
}
