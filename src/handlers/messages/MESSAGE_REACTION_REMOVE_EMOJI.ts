import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordMessageReactionRemoveEmoji } from "../../types/messages/message_reaction_remove_emoji.ts";

export async function handleMessageReactionRemoveEmoji(
  data: DiscordGatewayPayload,
) {
  const payload = data.d as DiscordMessageReactionRemoveEmoji;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = message.reactions.filter(
      (reaction) =>
        !(
          // MUST USE == because discord sends null and we use undefined
          reaction.emoji.id == payload.emoji.id &&
          reaction.emoji.name === payload.emoji.name
        ),
    );

    if (!message.reactions.length) message.reactions = undefined;

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveEmoji?.(
    payload.emoji,
    payload.message_id,
    payload.channel_id,
    payload.guild_id,
  );
}
