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
      // MUST USE == because discord sends null and we use undefined
      reaction.emoji.id == payload.emoji.id &&
      reaction.emoji.name === payload.emoji.name
    );

    if (reaction) {
      reaction.count--;
      if (reaction.count === 0) message.reactions = message.reactions?.filter(r => r.count !== 0);
      if (!message.reactions?.length) message.reactions = undefined;

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
