import { botID, eventHandlers } from "../../bot.ts";
import {
  GatewayPayload,
  MessageReactionAddEventPayload,
  MessageReactionRemoveAllEventPayload,
  MessageReactionRemoveEmojiPayload,
} from "../../types/mod.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";
import { structures } from "../structures/mod.ts";
import {
  MessageReactionRemoveAllEvent,
  MessageReactionRemoveEmoji,
} from "../types/gateway.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalMessageReactionAdd(data: GatewayPayload) {
  if (data.t !== "MESSAGE_REACTION_ADD") return;

  const payload = data.d as MessageReactionAddEventPayload;
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
    messageID: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id || "",
  };

  if (typeof payload.emoji === "string") {
    eventHandlers.reactionAdd?.(
      uncachedOptions,
      payload.emoji,
      payload.user_id,
      message,
    );
  }
}

export async function handleInternalMessageReactionRemove(
  data: GatewayPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE") return;

  const payload = data.d as MessageReactionAddEventPayload;
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
    messageID: payload.message_id,
    channelID: payload.channel_id,
    guildID: payload.guild_id,
  };

  eventHandlers.reactionRemove?.(
    uncachedOptions,
    snakeKeysToCamelCase(payload.emoji),
    payload.user_id,
    message,
  );
}

export async function handleInternalMessageReactionRemoveAll(
  data: GatewayPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_ALL") return;

  const payload = data.d as MessageReactionRemoveAllEventPayload;
  const message = await cacheHandlers.get("messages", payload.message_id);

  if (message?.reactions) {
    message.reactions = undefined;

    await cacheHandlers.set("messages", payload.message_id, message);
  }

  eventHandlers.reactionRemoveAll?.(
    snakeKeysToCamelCase(data.d) as MessageReactionRemoveAllEvent,
  );
}

export async function handleInternalMessageReactionRemoveEmoji(
  data: GatewayPayload,
) {
  if (data.t !== "MESSAGE_REACTION_REMOVE_EMOJI") return;

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
    snakeKeysToCamelCase(data.d) as MessageReactionRemoveEmoji,
  );
}
