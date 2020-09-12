import {
  DiscordBotGatewayData,
  DiscordPayload,
  GatewayOpcode,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
  WebhookUpdatePayload,
} from "../types/discord.ts";
import {
  eventHandlers,
  botGatewayData,
  identifyPayload,
  botID,
  IdentifyPayload,
} from "./client.ts";
import { delay } from "https://deno.land/std@0.67.0/async/delay.ts";
import { Guild } from "../structures/guild.ts";
import {
  GuildRolePayload,
  UserPayload,
  FetchMembersOptions,
  GuildRoleDeletePayload,
} from "../types/guild.ts";
import { cache } from "../utils/cache.ts";
import {
  MessageCreateOptions,
  MessageDeletePayload,
  MessageDeleteBulkPayload,
  MessageReactionPayload,
  BaseMessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
} from "../types/message.ts";
import {
  createBasicShard,
  requestGuildMembers,
  botGatewayStatusRequest,
} from "./basicShard.ts";
import { BotStatusRequest } from "../utils/utils.ts";
import { structures } from "../structures/mod.ts";
import { controllers } from "../controllers/mod.ts";

let shardCounter = 0;
let basicSharding = false;

const shards: Worker[] = [];
let createNextShard = true;

/** This function is meant to be used on the ready event to alert the library to start the next shard. */
export function allowNextShard(enabled = true) {
  createNextShard = enabled;
}

export function createShardWorker(shardID?: number) {
  const path = new URL("./shard.ts", import.meta.url).toString();
  const shard = new Worker(path, { type: "module", deno: true });
  shard.onmessage = (message) => {
    if (message.data.type === "REQUEST_CLIENT_OPTIONS") {
      identifyPayload.shard = [
        shardID || shardCounter,
        botGatewayData.shards,
      ];

      shard.postMessage(
        {
          type: "CREATE_SHARD",
          botGatewayData,
          identifyPayload,
          shardID: shardCounter,
        },
      );
      // Update the shard counter
      shardCounter++;
    } else if (message.data.type === "HANDLE_DISCORD_PAYLOAD") {
      handleDiscordPayload(
        JSON.parse(message.data.payload),
        message.data.shardID,
      );
    } else if (message.data.type === "DEBUG_LOG") {
      eventHandlers.debug?.(message.data.details);
    }
  };
  shards.push(shard);
}

export const spawnShards = async (
  data: DiscordBotGatewayData,
  payload: IdentifyPayload,
  id = 1,
) => {
  if ((data.shards === 1 && id === 1) || id <= data.shards) {
    if (createNextShard) {
      createNextShard = false;
      if (data.shards >= 25) createShardWorker();
      else {
        basicSharding = true;
        createBasicShard(data, payload, false, id - 1);
      }
      spawnShards(data, payload, id + 1);
    } else {
      await delay(1000);
      spawnShards(data, payload, id);
    }
  }
};

export async function handleDiscordPayload(
  data: DiscordPayload,
  shardID: number,
) {
  eventHandlers.raw?.(data);

  switch (data.op) {
    case GatewayOpcode.HeartbeatACK:
      // Incase the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case GatewayOpcode.Dispatch:
      if (!data.t) return;
      // Run the appropriate controller for this event.
      controllers[data.t]?.(data, shardID);

      if (data.t === "MESSAGE_CREATE") {
        const options = data.d as MessageCreateOptions;
        const channel = cache.channels.get(options.channel_id);
        if (channel) channel.lastMessageID = options.id;

        const message = structures.createMessage(options);
        // Cache the message
        cache.messages.set(options.id, message);
        const guild = options.guild_id
          ? cache.guilds.get(options.guild_id)
          : undefined;

        if (options.member) {
          // If in a guild cache the author as a member
          guild?.members.set(
            options.author.id,
            structures.createMember(
              { ...options.member, user: options.author },
              guild,
            ),
          );
        }

        options.mentions.forEach((mention) => {
          // Cache the member if its a valid member
          if (mention.member) {
            guild?.members.set(
              mention.id,
              structures.createMember(
                { ...mention.member, user: mention },
                guild,
              ),
            );
          }
        });

        return eventHandlers.messageCreate?.(message);
      }

      if (
        data.t && ["MESSAGE_DELETE", "MESSAGE_DELETE_BULK"].includes(data.t)
      ) {
        const options = data.d as MessageDeletePayload;
        const deletedMessages = data.t === "MESSAGE_DELETE"
          ? [options.id]
          : (data.d as MessageDeleteBulkPayload).ids;

        const channel = cache.channels.get(options.channel_id);
        if (!channel) return;

        deletedMessages.forEach((id) => {
          const message = cache.messages.get(id);
          if (!message) return;
          eventHandlers.messageDelete?.(message || { id, channel });
          cache.messages.delete(id);
        });
      }

      if (data.t === "MESSAGE_UPDATE") {
        const options = data.d as MessageCreateOptions;
        const channel = cache.channels.get(options.channel_id);
        if (!channel) return;

        const cachedMessage = cache.messages.get(options.id);
        if (!cachedMessage) return;

        const oldMessage = {
          attachments: cachedMessage.attachments,
          content: cachedMessage.content,
          embeds: cachedMessage.embeds,
          editedTimestamp: cachedMessage.editedTimestamp,
          tts: cachedMessage.tts,
          pinned: cachedMessage.pinned,
        };

        // Messages with embeds can trigger update but they wont have edited_timestamp
        if (
          !options.edited_timestamp ||
          (cachedMessage.content !== options.content)
        ) {
          return;
        }

        return eventHandlers.messageUpdate?.(cachedMessage, oldMessage);
      }

      if (
        data.t &&
        ["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(data.t)
      ) {
        const options = data.d as MessageReactionPayload;
        const message = cache.messages.get(options.message_id);
        const isAdd = data.t === "MESSAGE_REACTION_ADD";

        if (message) {
          const previousReactions = message.reactions;
          const reactionExisted = previousReactions?.find(
            (reaction) =>
              reaction.emoji.id === options.emoji.id &&
              reaction.emoji.name === options.emoji.name,
          );
          if (reactionExisted) {
            reactionExisted.count = isAdd
              ? reactionExisted.count + 1
              : reactionExisted.count - 1;
          } else {
            const newReaction = {
              count: 1,
              me: options.user_id === botID,
              emoji: { ...options.emoji, id: options.emoji.id || undefined },
            };
            message.reactions = message.reactions
              ? [...message.reactions, newReaction]
              : [newReaction];
          }

          cache.messages.set(options.message_id, message);
        }

        if (options.member && options.guild_id) {
          const guild = cache.guilds.get(options.guild_id);
          guild?.members.set(
            options.member.user.id,
            structures.createMember(
              options.member,
              guild,
            ),
          );
        }

        const uncachedOptions = {
          ...options,
          id: options.message_id,
          channelID: options.channel_id,
          guildID: options.guild_id,
        };

        return isAdd
          ? eventHandlers.reactionAdd?.(
            message || uncachedOptions,
            options.emoji,
            options.user_id,
          )
          : eventHandlers.reactionRemove?.(
            message || uncachedOptions,
            options.emoji,
            options.user_id,
          );
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        return eventHandlers.reactionRemoveAll?.(
          data.d as BaseMessageReactionPayload,
        );
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
        return eventHandlers.reactionRemoveEmoji?.(
          data.d as MessageReactionRemoveEmojiPayload,
        );
      }

      if (data.t === "PRESENCE_UPDATE") {
        const payload = data.d as PresenceUpdatePayload;
        const oldPresence = cache.presences.get(payload.user.id);
        cache.presences.set(payload.user.id, payload);
        return eventHandlers.presenceUpdate?.(payload, oldPresence);
      }

      if (data.t === "TYPING_START") {
        return eventHandlers.typingStart?.(data.d as TypingStartPayload);
      }

      if (data.t === "USER_UPDATE") {
        const userData = data.d as UserPayload;

        cache.guilds.forEach((guild) => {
          const member = guild.members.get(userData.id);
          if (!member) return;
          // member.author = userData;
          Object.entries(userData).forEach(([key, value]) => {
            // @ts-ignore
            if (member[key] === value) return;
            // @ts-ignore
            member[key] = value;
          });
        });
        return eventHandlers.botUpdate?.(userData);
      }

      if (data.t === "VOICE_STATE_UPDATE") {
        const payload = data.d as VoiceStateUpdatePayload;
        if (!payload.guild_id) return;

        const guild = cache.guilds.get(payload.guild_id);
        if (!guild) return;

        const member = guild.members.get(payload.user_id) ||
          (payload.member
            ? structures.createMember(payload.member, guild)
            : undefined);
        if (!member) return;

        // No cached state before so lets make one for em
        const cachedState = guild.voiceStates.get(payload.user_id);

        guild.voiceStates.set(payload.user_id, {
          ...payload,
          guildID: payload.guild_id,
          channelID: payload.channel_id,
          userID: payload.user_id,
          sessionID: payload.session_id,
          selfDeaf: payload.self_deaf,
          selfMute: payload.self_mute,
          selfStream: payload.self_stream,
        });

        if (cachedState?.channelID !== payload.channel_id) {
          // Either joined or moved channels
          if (payload.channel_id) {
            cachedState?.channelID
              ? // Was in a channel before
                eventHandlers.voiceChannelSwitch?.(
                  member,
                  payload.channel_id,
                  cachedState.channelID,
                )
              : // Was not in a channel before so user just joined
                eventHandlers.voiceChannelJoin?.(member, payload.channel_id);
          } // Left the channel
          else if (cachedState?.channelID) {
            guild.voiceStates.delete(payload.user_id);
            eventHandlers.voiceChannelLeave?.(member, cachedState.channelID);
          }
        }

        return eventHandlers.voiceStateUpdate?.(member, payload);
      }

      if (data.t === "WEBHOOKS_UPDATE") {
        const options = data.d as WebhookUpdatePayload;
        return eventHandlers.webhooksUpdate?.(
          options.channel_id,
          options.guild_id,
        );
      }

      return;
    default:
      return;
  }
}

export async function requestAllMembers(
  guild: Guild,
  resolve: Function,
  options?: FetchMembersOptions,
) {
  const nonce = `${guild.id}-${Math.random().toString()}`;
  cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

  if (basicSharding) {
    return requestGuildMembers(guild.id, guild.shardID, nonce, options);
  }

  shards[guild.shardID].postMessage({
    type: "FETCH_MEMBERS",
    guildID: guild.id,
    nonce,
    options,
  });
}

export function sendGatewayCommand(type: "EDIT_BOTS_STATUS", payload: object) {
  if (basicSharding) {
    if (type === "EDIT_BOTS_STATUS") {
      botGatewayStatusRequest(payload as BotStatusRequest);
    }

    return;
  }
  shards.forEach((shard) => {
    shard.postMessage({
      type,
      ...payload,
    });
  });
}
