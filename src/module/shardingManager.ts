import {
  DiscordBotGatewayData,
  DiscordPayload,
  GatewayOpcode,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
  WebhookUpdatePayload,
  ReadyPayload,
} from "../types/discord.ts";
import {
  eventHandlers,
  botGatewayData,
  identifyPayload,
  botID,
  setBotID,
  IdentifyPayload,
} from "./client.ts";
import { delay } from "https://deno.land/std@0.61.0/async/delay.ts";
import {
  handleInternalChannelCreate,
  handleInternalChannelUpdate,
  handleInternalChannelDelete,
} from "../events/channels.ts";
import { ChannelCreatePayload } from "../types/channel.ts";
import { createGuild, Guild } from "../structures/guild.ts";
import {
  CreateGuildPayload,
  GuildDeletePayload,
  GuildBanPayload,
  GuildEmojisUpdatePayload,
  GuildMemberAddPayload,
  GuildMemberUpdatePayload,
  GuildMemberChunkPayload,
  GuildRolePayload,
  UserPayload,
  FetchMembersOptions,
  GuildRoleDeletePayload,
  UpdateGuildPayload,
} from "../types/guild.ts";
import {
  handleInternalGuildCreate,
  handleInternalGuildDelete,
} from "../events/guilds.ts";
import { cache } from "../utils/cache.ts";
import { createMember } from "../structures/member.ts";
import { createRole } from "../structures/role.ts";
import {
  MessageCreateOptions,
  MessageDeletePayload,
  MessageDeleteBulkPayload,
  MessageReactionPayload,
  BaseMessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
} from "../types/message.ts";
import { createMessage } from "../structures/message.ts";
import { GuildUpdateChange } from "../types/options.ts";
import {
  createBasicShard,
  requestGuildMembers,
  botGatewayStatusRequest,
} from "./basicShard.ts";
import { BotStatusRequest } from "../utils/utils.ts";

let shardCounter = 0;
let basicSharding = false;

export interface FetchAllMembersRequest {
  resolve: Function;
  requestedMax: number;
  receivedAmount: number;
}

const fetchAllMembersProcessingRequests = new Map<
  string,
  Function
>();
const shards: Worker[] = [];
let createNextShard = true;

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
      if (data.t === "READY") {
        const payload = data.d as ReadyPayload;
        setBotID(payload.user.id);
        // Triggered on each shard
        eventHandlers.shardReady?.(shardID);
        if (payload.shard && shardID === payload.shard[1] - 1) {
          cache.isReady = true;
          eventHandlers.ready?.();
        }
        // Wait 5 seconds to spawn next shard
        await delay(5000);
        createNextShard = true;
      }

      if (data.t === "CHANNEL_CREATE") {
        return handleInternalChannelCreate(data.d as ChannelCreatePayload);
      }

      if (data.t === "CHANNEL_UPDATE") {
        return handleInternalChannelUpdate(data.d as ChannelCreatePayload);
      }
      if (data.t === "CHANNEL_DELETE") {
        return handleInternalChannelDelete(data.d as ChannelCreatePayload);
      }

      if (data.t === "GUILD_CREATE") {
        const options = data.d as CreateGuildPayload;
        // When shards resume they emit GUILD_CREATE again.
        if (cache.guilds.has(options.id)) {
          return;
        }

        const guild = createGuild(data.d as CreateGuildPayload, shardID);
        handleInternalGuildCreate(guild);
        if (cache.unavailableGuilds.get(options.id)) {
          cache.unavailableGuilds.delete(options.id);
        }

        if (!cache.isReady) return eventHandlers.guildLoaded?.(guild);
        return eventHandlers.guildCreate?.(guild);
      }

      if (data.t === "GUILD_UPDATE") {
        const options = data.d as UpdateGuildPayload;
        const cachedGuild = cache.guilds.get(options.id);
        if (!cachedGuild) return;

        const keysToSkip = [
          "roles",
          "guild_hashes",
          "guild_id",
          "max_members",
          "emojis",
        ];
        const changes = Object.entries(options)
          .map(([key, value]) => {
            if (keysToSkip.includes(key)) return;

            // @ts-ignore
            const cachedValue = cachedGuild[key];
            if (cachedValue !== value) {
              // Guild create sends undefined and update sends false.
              if (!cachedValue && !value) return;

              if (Array.isArray(cachedValue) && Array.isArray(value)) {
                const different = (cachedValue.length !== value.length) ||
                  cachedValue.find((val) => !value.includes(val)) ||
                  value.find((val) => !cachedValue.includes(val));
                if (!different) return;
              }

              // This will update the cached guild with the new values
              // @ts-ignore
              cachedGuild[key] = value;
              return { key, oldValue: cachedValue, value };
            }
            return;
          }).filter((change) => change) as GuildUpdateChange[];

        return eventHandlers.guildUpdate?.(cachedGuild, changes);
      }

      if (data.t === "GUILD_DELETE") {
        const options = data.d as GuildDeletePayload;
        const guild = cache.guilds.get(options.id);
        if (!guild) return;

        guild.channels.forEach((channel) => cache.channels.delete(channel.id));
        cache.messages.forEach((message) => {
          if (message.guildID === guild.id) cache.messages.delete(message.id);
        });

        if (options.unavailable) {
          return cache.unavailableGuilds.set(options.id, Date.now());
        }

        handleInternalGuildDelete(guild);
        return eventHandlers.guildDelete?.(guild);
      }

      if (data.t && ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE"].includes(data.t)) {
        const options = data.d as GuildBanPayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const member = guild.members.get(options.user.id);

        return data.t === "GUILD_BAN_ADD"
          ? eventHandlers.guildBanAdd?.(guild, member || options.user)
          : eventHandlers.guildBanRemove?.(guild, member || options.user);
      }

      if (data.t === "GUILD_EMOJIS_UPDATE") {
        const options = data.d as GuildEmojisUpdatePayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const cachedEmojis = guild.emojis;
        guild.emojis = options.emojis;

        return eventHandlers.guildEmojisUpdate?.(
          guild,
          options.emojis,
          cachedEmojis,
        );
      }

      if (data.t === "GUILD_MEMBER_ADD") {
        const options = data.d as GuildMemberAddPayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const memberCount = guild.memberCount + 1;
        guild.memberCount = memberCount;
        const member = createMember(
          options,
          guild,
        );
        guild.members.set(options.user.id, member);

        return eventHandlers.guildMemberAdd?.(guild, member);
      }

      if (data.t === "GUILD_MEMBER_REMOVE") {
        const options = data.d as GuildBanPayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const memberCount = guild.memberCount - 1;
        guild.memberCount = memberCount;

        const member = guild.members.get(options.user.id);
        return eventHandlers.guildMemberRemove?.(
          guild,
          member || options.user,
        );
      }

      if (data.t === "GUILD_MEMBER_UPDATE") {
        const options = data.d as GuildMemberUpdatePayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const cachedMember = guild.members.get(options.user.id);

        const newMemberData = {
          ...options,
          premium_since: options.premium_since || undefined,
          joined_at: new Date(cachedMember?.joinedAt || Date.now())
            .toISOString(),
          deaf: cachedMember?.deaf || false,
          mute: cachedMember?.mute || false,
        };
        const member = createMember(
          newMemberData,
          guild,
        );
        guild.members.set(options.user.id, member);

        if (cachedMember?.nick !== options.nick) {
          eventHandlers.nicknameUpdate?.(
            guild,
            member,
            options.nick,
            cachedMember?.nick,
          );
        }
        const roleIDs = cachedMember?.roles || [];

        roleIDs.forEach((id) => {
          if (!options.roles.includes(id)) {
            eventHandlers.roleLost?.(guild, member, id);
          }
        });

        options.roles.forEach((id) => {
          if (!roleIDs.includes(id)) {
            eventHandlers.roleGained?.(guild, member, id);
          }
        });

        return eventHandlers.guildMemberUpdate?.(guild, member, cachedMember);
      }

      if (data.t === "GUILD_MEMBERS_CHUNK") {
        const options = data.d as GuildMemberChunkPayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        options.members.forEach((member) => {
          guild.members.set(
            member.user.id,
            createMember(
              member,
              guild,
            ),
          );
        });

        // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
        if (
          options.nonce
        ) {
          const resolve = fetchAllMembersProcessingRequests.get(options.nonce);
          if (!resolve) return;

          if (options.chunk_index + 1 === options.chunk_count) {
            fetchAllMembersProcessingRequests.delete(options.nonce);
            resolve();
          }
        }
      }

      if (data.t === "GUILD_ROLE_DELETE") {
        const options = data.d as GuildRoleDeletePayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        const cachedRole = guild.roles.get(options.role_id)!;
        guild.roles.delete(options.role_id);
        return eventHandlers.roleDelete?.(guild, cachedRole);
      }

      if (
        data.t &&
        ["GUILD_ROLE_CREATE", "GUILD_ROLE_UPDATE"]
          .includes(data.t)
      ) {
        const options = data.d as GuildRolePayload;
        const guild = cache.guilds.get(options.guild_id);
        if (!guild) return;

        if (data.t === "GUILD_ROLE_CREATE") {
          const role = createRole(options.role);
          const roles = guild.roles.set(options.role.id, role);
          guild.roles = roles;
          return eventHandlers.roleCreate?.(guild, role);
        }

        const cachedRole = guild.roles.get(options.role.id);
        if (!cachedRole) return;

        if (data.t === "GUILD_ROLE_UPDATE") {
          const role = createRole(options.role);
          return eventHandlers.roleUpdate?.(guild, role, cachedRole);
        }
      }

      if (data.t === "MESSAGE_CREATE") {
        const options = data.d as MessageCreateOptions;
        const channel = cache.channels.get(options.channel_id);
        if (channel) channel.lastMessageID = options.id;

        const message = createMessage(options);
        // Cache the message
        cache.messages.set(options.id, message);
        const guild = options.guild_id
          ? cache.guilds.get(options.guild_id)
          : undefined;

        if (options.member) {
          // If in a guild cache the author as a member
          guild?.members.set(
            options.author.id,
            createMember(
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
              createMember({ ...mention.member, user: mention }, guild),
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
            createMember(
              options.member,
              guild,
            ),
          );
        }

        return isAdd
          ? eventHandlers.reactionAdd?.(
            message || options,
            options.emoji,
            options.user_id,
          )
          : eventHandlers.reactionRemove?.(
            message || options,
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
          (payload.member ? createMember(payload.member, guild) : undefined);
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
  const nonce = Math.random().toString();
  fetchAllMembersProcessingRequests.set(nonce, resolve);

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
