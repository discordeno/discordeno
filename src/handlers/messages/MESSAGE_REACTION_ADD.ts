import { botID, eventHandlers } from "../../bot.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleMessageReactionAdd(data: DiscordPayload) {
  const payload = data.d as MessageReactionPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message) {
    const reactionExisted = message.reactions?.find(
      (reaction) =>
        reaction.emoji.id === payload.emoji.id &&
        reaction.emoji.name === payload.emoji.name,
    );

    if (reactionExisted) reactionExisted.count++;
    else {
      const newReaction = {
        count: 1,
        me: payload.user_id === botID,
        emoji: { ...payload.emoji, id: payload.emoji.id || undefined },
      };
      message.reactions = message.reactions
        ? [...message.reactions, newReaction]
        : [newReaction];
    }

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  if (payload.member && payload.guild_id) {
    const guild = await cacheHandlers.get("guilds", payload.guild_id);
    if (guild) {
      const memberStruct = await structures.createMemberStruct(
        payload.member,
        guild.id,
      );
      await cacheHandlers.set("members", memberStruct.id, memberStruct);
    }
  }

  const uncachedOptions = {
    ...payload,
    id: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id || "",
  };

  eventHandlers.reactionAdd?.(
    uncachedOptions,
    payload.emoji,
    payload.user_id,
    message,
  );
}
