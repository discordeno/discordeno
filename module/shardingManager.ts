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
} from "./client.ts";
import { delay } from "https://deno.land/std@0.50.0/async/delay.ts";
import {
  handleInternalChannelCreate,
  handleInternalChannelUpdate,
  handleInternalChannelDelete,
} from "../events/channels.ts";
import { ChannelCreatePayload } from "../types/channel.ts";
import { createGuild } from "../structures/guild.ts";
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
} from "../types/guild.ts";
import {
  handleInternalGuildCreate,
  handleInternalGuildUpdate,
  handleInternalGuildDelete,
} from "../events/guilds.ts";
import { cache } from "../utils/cache.ts";
import { createUser } from "../structures/user.ts";
import { createMember } from "../structures/member.ts";
import { createRole } from "../structures/role.ts";
import {
  MessageCreateOptions,
  MessageDeletePayload,
  MessageDeleteBulkPayload,
  MessageUpdatePayload,
  MessageReactionPayload,
  BaseMessageReactionPayload,
  MessageReactionRemoveEmojiPayload,
} from "../types/message.ts";
import { createMessage } from "../structures/message.ts";

let shardCounter = 0;

export interface FetchAllMembersRequest {
  resolve: Function;
  requestedMax: number;
  receivedAmount: number;
}

const fetchAllMembersProcessingRequests = new Map<
  string,
  FetchAllMembersRequest
>();
const shards: Worker[] = [];
let createNextShard = true;

export function createShardWorker(shardID?: number) {
  const path = new URL("./shard.ts", import.meta.url).toString();
  const shard = new Worker(path, { type: "module", deno: true });
  shard.onmessage = (message) => {
    if (message.data.type === "REQUEST_CLIENT_OPTIONS") {
      identifyPayload.shard = [
        shardID || shardCounter++,
        botGatewayData.shards,
      ];

      shard.postMessage(
        {
          type: "CREATE_SHARD",
          botGatewayData,
          identifyPayload,
        },
      );
    } else if (message.data.type === "HANDLE_DISCORD_PAYLOAD") {
      handleDiscordPayload(JSON.parse(message.data.payload));
    }
  };
  shards.push(shard);
}

export const spawnShards = async (
  data: DiscordBotGatewayData,
  payload: unknown,
  id = 1,
) => {
  if (id < data.shards) {
    if (createNextShard) {
      createNextShard = false;
      createShardWorker();
      spawnShards(data, payload, id + 1);
    } else {
      await delay(1000);
      spawnShards(data, payload, id);
    }
  }
};

async function handleDiscordPayload(data: DiscordPayload) {
  eventHandlers.raw?.(data);

  switch (data.op) {
    case GatewayOpcode.HeartbeatACK:
      // Incase the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.();
    case GatewayOpcode.Dispatch:
      if (data.t === "READY") {
        // Triggered on each shard
        eventHandlers.ready?.();
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
        const guild = createGuild(data.d as CreateGuildPayload);
        handleInternalGuildCreate(guild);
        if (cache.unavailableGuilds.get(guild.id)) {
          return cache.unavailableGuilds.delete(guild.id);
        }
        return eventHandlers.guildCreate?.(guild);
      }

      if (data.t === "GUILD_UPDATE") {
        const options = data.d as CreateGuildPayload;
        const cachedGuild = cache.guilds.get(options.id);
        const guild = createGuild(options);
        handleInternalGuildUpdate(guild);
        if (!cachedGuild) return;

        return eventHandlers.guildUpdate?.(guild, cachedGuild);
      }

      if (data.t === "GUILD_DELETE") {
        const options = data.d as GuildDeletePayload;
        const guild = cache.guilds.get(options.id);
        if (!guild) return;

        guild.channels.forEach((channel) => cache.channels.delete(channel.id));
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

        const user = createUser(options.user);
        return data.t === "GUILD_BAN_ADD"
          ? eventHandlers.guildBanAdd?.(guild, user)
          : eventHandlers.guildBanRemove?.(guild, user);
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
        cache.users.set(options.user.id, createUser(member.user));

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
          member || createUser(options.user),
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
          joined_at: new Date(cachedMember?.joined_at || Date.now())
            .toISOString(),
          deaf: cachedMember?.deaf || false,
          mute: cachedMember?.mute || false,
        };
        const member = createMember(
          newMemberData,
          guild,
        );
        guild.members.set(options.user.id, member);
        cache.users.set(options.user.id, createUser(member.user));

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
          cache.users.set(member.user.id, createUser(member.user));
        });

        // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
        if (
          options.nonce
        ) {
          const request = fetchAllMembersProcessingRequests.get(options.nonce);
          if (!request) return;

          if (options.chunk_index + 1 === options.chunk_count) {
            fetchAllMembersProcessingRequests.delete(options.nonce);
            request.resolve();
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
        if (channel) channel.last_message_id = options.id;

        // Cache the message author themself
        cache.users.set(options.author.id, createUser(options.author));

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
          // For each mention cache the user
          cache.users.set(mention.id, createUser(mention));
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
        const options = data.d as MessageUpdatePayload;
        const channel = cache.channels.get(options.channel_id);
        if (!channel) return;

        // const cachedMessage = channel.messages().get(options.id)
        // return eventHandlers.message_update?.(message, cachedMessage)
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
          if (guild) {
            const member = createMember(
              options.member,
              guild,
            );
            guild.members.set(
              options.member.user.id,
              member,
            );
            cache.users.set(options.member.user.id, createUser(member.user));
          }
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
        return eventHandlers.presenceUpdate?.(data.d as PresenceUpdatePayload);
      }

      if (data.t === "TYPING_START") {
        return eventHandlers.typingStart?.(data.d as TypingStartPayload);
      }

      if (data.t === "USER_UPDATE") {
        const userData = data.d as UserPayload;
        const cachedUser = cache.users.get(botID);
        const user = createUser(userData);
        cache.users.set(userData.id, user);
        return eventHandlers.botUpdate?.(user, cachedUser);
      }

      if (data.t === "VOICE_STATE_UPDATE") {
        const payload = data.d as VoiceStateUpdatePayload;
        if (!payload.guild_id) return;

        const guild = cache.guilds.get(payload.guild_id);
        if (!guild) return;

        const member = guild.members.get(payload.user_id);
        if (!member) return;

        // No cached state before so lets make one for em
        const cachedState = guild.voiceStates.get(payload.user_id);
        if (!cachedState) {
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
          return;
        }

        if (cachedState.channelID !== payload.channel_id) {
          // Either joined or moved channels
          if (payload.channel_id) {
            cachedState.channelID
              ? // Was in a channel before
                eventHandlers.voiceChannelSwitch?.(
                  member,
                  payload.channel_id,
                  cachedState.channelID,
                )
              : // Was not in a channel before so user just joined
                eventHandlers.voiceChannelJoin?.(member, payload.channel_id);
          } // Left the channel
          else if (cachedState.channelID) {
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

export function requestAllMembers(
  guildID: string,
  resolve: Function,
  memberCount: number,
  options?: FetchMembersOptions,
) {
  const payload = {
    resolve,
    requestedMax: options?.query
      ? 100
      : options?.userIDs?.length || options?.limit || memberCount,
    receivedAmount: 0,
  };

  const nonce = Math.random().toString();
  fetchAllMembersProcessingRequests.set(nonce, payload);

  return shards[0].postMessage({
    type: "FETCH_MEMBERS",
    guildID,
    nonce,
    options,
  });
}

export function sendGatewayCommand(type: "EDIT_BOTS_STATUS", payload: object) {
  shards.forEach((shard) => {
    shard.postMessage({
      type,
      ...payload,
    });
  });
}
