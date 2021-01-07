import { botID, eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  MessageReactionAddEventPayload,
  MessageReactionRemoveAllEventPayload,
  MessageReactionRemoveEmojiPayload,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageReactionAdd(data: GatewayPayload) {
  if (data.t !== "MESSAGE_REACTION_ADD") return;

  const payload = data.d as MessageReactionAddEventPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message) {
    const previousReactions = message.reactions;
    const reactionExisted = previousReactions?.find(
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
      await structures.createMember(payload.member, guild.id);
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

export async function handleInternalMessageReactionRemove(
  data: GatewayPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE") return;

  const payload = data.d as MessageReactionAddEventPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message) {
    const previousReactions = message.reactions;
    const reactionExisted = previousReactions?.find(
      (reaction) =>
        reaction.emoji.id === payload.emoji.id &&
        reaction.emoji.name === payload.emoji.name,
    );

    if (reactionExisted) reactionExisted.count--;
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
      await structures.createMember(
        payload.member,
        guild.id,
      );
    }
  }

  const uncachedOptions = {
    ...payload,
    id: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id,
  };

  eventHandlers.reactionRemove?.(
    uncachedOptions,
    payload.emoji,
    payload.user_id,
    message,
  );
}

export function handleInternalMessageReactionRemoveAll(data: GatewayPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_ALL") return;

  eventHandlers.reactionRemoveAll?.(
    data.d as MessageReactionRemoveAllEventPayload,
  );
}

export function handleInternalMessageReactionRemoveEmoji(data: GatewayPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_EMOJI") return;

  eventHandlers.reactionRemoveEmoji?.(
    data.d as MessageReactionRemoveEmojiPayload,
  );
}
