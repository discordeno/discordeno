import { botID, eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import { DiscordPayload } from "../types/discord.ts";
import {
  BaseMessageReactionPayload,
  MessageReactionPayload,
	MessageReactionRemoveEmojiPayload,
} from "../types/message.ts";
import { cache } from "../utils/cache.ts";

export function handleInternalMessageReactionAdd(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_ADD") return;

  const payload = data.d as MessageReactionPayload;
  const message = cache.messages.get(payload.message_id);

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

    cache.messages.set(payload.message_id, message);
  }

  if (payload.member && payload.guild_id) {
    const guild = cache.guilds.get(payload.guild_id);
    guild?.members.set(
      payload.member.user.id,
      structures.createMember(
        payload.member,
        guild,
      ),
    );
  }

  const uncachedOptions = {
    ...payload,
    id: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id,
  };

  eventHandlers.reactionAdd?.(
    message || uncachedOptions,
    payload.emoji,
    payload.user_id,
  );
}

export function handleInternalMessageReactionRemove(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE") return;

  const payload = data.d as MessageReactionPayload;
  const message = cache.messages.get(payload.message_id);

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

    cache.messages.set(payload.message_id, message);
  }

  if (payload.member && payload.guild_id) {
    const guild = cache.guilds.get(payload.guild_id);
    guild?.members.set(
      payload.member.user.id,
      structures.createMember(
        payload.member,
        guild,
      ),
    );
  }

  const uncachedOptions = {
    ...payload,
    id: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id,
  };

  eventHandlers.reactionRemove?.(
    message || uncachedOptions,
    payload.emoji,
    payload.user_id,
  );
}

export function handleInternalMessageReactionRemoveAll(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_ALL") return;

  eventHandlers.reactionRemoveAll?.(data.d as BaseMessageReactionPayload);
}

export function handleInternalMessageReactionRemoveEmoji(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_EMOJI") return;

  eventHandlers.reactionRemoveEmoji?.(data.d as MessageReactionRemoveEmojiPayload);
}
