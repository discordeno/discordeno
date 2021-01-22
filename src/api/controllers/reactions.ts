import { botID, eventHandlers } from "../../bot.ts";
import {
  BaseMessageReactionPayload,
  DiscordPayload,
  MessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
} from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageReactionAdd(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_ADD") return;

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
  data: DiscordPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE") return;

  const payload = data.d as MessageReactionPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message) {
    const reactionExisted = message.reactions?.find(
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

export async function handleInternalMessageReactionRemoveAll(
  data: DiscordPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_ALL") return;

  const payload = data.d as BaseMessageReactionPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = undefined;

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveAll?.(data.d as BaseMessageReactionPayload);
}

export function handleInternalMessageReactionRemoveEmoji(data: DiscordPayload) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_EMOJI") return;

  eventHandlers.reactionRemoveEmoji?.(
    data.d as MessageReactionRemoveEmojiPayload,
  );
}
