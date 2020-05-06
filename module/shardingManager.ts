import {
  DiscordBotGatewayData,
  DiscordPayload,
  GatewayOpcode,
  DiscordHeartbeatPayload,
  ReadyPayload,
  PresenceUpdatePayload,
  TypingStartPayload,
  VoiceStateUpdatePayload,
  WebhookUpdatePayload,
} from "../types/discord.ts"
import { eventHandlers, botID, botGatewayData, identifyPayload } from "./client.ts"
import { updatePreviousSequenceNumber, sendConstantHeartbeats, previousSequenceNumber } from "./gateway.ts"
import { WebSocket, connectWebSocket } from "https://deno.land/std@v1.0.0-rc1/ws/mod.ts"
import { handleInternalChannelCreate } from "../events/channels.ts"
import { handleInternalChannelUpdate } from "../events/channels.ts"
import { handleInternalChannelDelete } from "../events/channels.ts"
import { createGuild } from "../structures/guild.ts"
import { handleInternalGuildCreate } from "../events/guilds.ts"
import { cache } from "../utils/cache.ts"
import { handleInternalGuildUpdate } from "../events/guilds.ts"
import { CreateGuildPayload, GuildMemberChunkPayload, GuildRolePayload, UserPayload } from "../types/guild.ts"
import { GuildDeletePayload } from "../types/guild.ts"
import { handleInternalGuildDelete } from "../events/guilds.ts"
import { GuildBanPayload } from "../types/guild.ts"
import { createUser } from "../structures/user.ts"
import { GuildEmojisUpdatePayload } from "../types/guild.ts"
import { GuildMemberAddPayload } from "../types/guild.ts"
import { createMember } from "../structures/member.ts"
import { GuildMemberUpdatePayload } from "../types/guild.ts"
import { ChannelCreatePayload } from "../types/channel.ts"
import { createRole } from "../structures/role.ts"
import { MessageCreateOptions } from "../types/message.ts"
import { createMessage } from "../structures/message.ts"
import { MessageDeletePayload } from "../types/message.ts"
import { MessageDeleteBulkPayload } from "../types/message.ts"
import { MessageUpdatePayload } from "../types/message.ts"
import { MessageReactionPayload } from "../types/message.ts"
import { BaseMessageReactionPayload } from "../types/message.ts"
import { MessageReactionRemoveEmojiPayload } from "../types/message.ts"

/** The session id is needed for RESUME functionality when discord disconnects randomly. */
let sessionID = ""

function createShardWorker() {
  new Worker("./module/shard.ts", { type: "module" })
}

export const spawnShards = (data: DiscordBotGatewayData, payload: unknown, id = 0) => {
  identifyPayload.shards = [id, data.shards]
  createShardWorker()
  if (id < data.shards) spawnShards(data, payload, id + 1)
}

export function handleDiscordPayload(data: DiscordPayload, socket: WebSocket, resumeInterval: number) {
  // Update the sequence number if it is present
  if (data.s) updatePreviousSequenceNumber(data.s)
  eventHandlers.raw?.(data)

  switch (data.op) {
    case GatewayOpcode.Hello:
      sendConstantHeartbeats(socket, (data.d as DiscordHeartbeatPayload).heartbeat_interval)
      return
    case GatewayOpcode.HeartbeatACK:
      // Incase the user wants to listen to heartbeat responses
      return eventHandlers.heartbeat?.()
    case GatewayOpcode.Reconnect:
    case GatewayOpcode.InvalidSession:
      // Reconnect to the gateway https://discordapp.com/developers/docs/topics/gateway#reconnect
      // I think this should be handled automatically when the websocket closes
      return
    case GatewayOpcode.Resume:
      return clearInterval(resumeInterval)
    case GatewayOpcode.Dispatch:
      if (data.t === "READY") {
        // Important for RESUME
        sessionID = (data.d as ReadyPayload).session_id
        return eventHandlers.ready?.()
      }

      if (data.t === "CHANNEL_CREATE") return handleInternalChannelCreate(data.d as ChannelCreatePayload)
      if (data.t === "CHANNEL_UPDATE") return handleInternalChannelUpdate(data.d as ChannelCreatePayload)
      if (data.t === "CHANNEL_DELETE") return handleInternalChannelDelete(data.d as ChannelCreatePayload)

      if (data.t === "GUILD_CREATE") {
        const guild = createGuild(data.d as CreateGuildPayload)
        handleInternalGuildCreate(guild)
        if (cache.unavailableGuilds.get(guild.id)) return cache.unavailableGuilds.delete(guild.id)
        return eventHandlers.guildCreate?.(guild)
      }

      if (data.t === "GUILD_UPDATE") {
        const options = data.d as CreateGuildPayload
        const cachedGuild = cache.guilds.get(options.id)
        const guild = createGuild(options)
        handleInternalGuildUpdate(guild)
        if (!cachedGuild) return

        return eventHandlers.guildUpdate?.(guild, cachedGuild)
      }

      if (data.t === "GUILD_DELETE") {
        const options = data.d as GuildDeletePayload
        const guild = cache.guilds.get(options.id)
        if (!guild) return

        guild.channels.forEach((channel) => cache.channels.delete(channel.id))
        if (options.unavailable) return cache.unavailableGuilds.set(options.id, Date.now())

        handleInternalGuildDelete(guild)
        return eventHandlers.guildDelete?.(guild)
      }

      if (data.t && ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE"].includes(data.t)) {
        const options = data.d as GuildBanPayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const user = createUser(options.user)
        return data.t === "GUILD_BAN_ADD"
          ? eventHandlers.guildBanAdd?.(guild, user)
          : eventHandlers.guildBanRemove?.(guild, user)
      }

      if (data.t === "GUILD_EMOJIS_UPDATE") {
        const options = data.d as GuildEmojisUpdatePayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const cachedEmojis = guild.emojis
        guild.emojis = options.emojis

        return eventHandlers.guildEmojisUpdate?.(guild, options.emojis, cachedEmojis)
      }

      if (data.t === "GUILD_MEMBER_ADD") {
        const options = data.d as GuildMemberAddPayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const memberCount = guild.memberCount + 1
        guild.memberCount = memberCount
        const member = createMember(
          options,
          options.guild_id,
          [...guild.roles.values()].map((role) => role.raw),
          guild.owner_id
        )
        guild.members.set(options.user.id, member)

        return eventHandlers.guildMemberAdd?.(guild, member)
      }

      if (data.t === "GUILD_MEMBER_REMOVE") {
        const options = data.d as GuildBanPayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const memberCount = guild.memberCount - 1
        guild.memberCount = memberCount

        const member = guild.members.get(options.user.id)
        return eventHandlers.guildMemberRemove?.(guild, member || createUser(options.user))
      }

      if (data.t === "GUILD_MEMBER_UPDATE") {
        const options = data.d as GuildMemberUpdatePayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const cachedMember = guild.members.get(options.user.id)

        const newMemberData = {
          ...options,
          premium_since: options.premium_since || undefined,
          joined_at: new Date(cachedMember?.joined_at || Date.now()).toISOString(),
          deaf: cachedMember?.deaf || false,
          mute: cachedMember?.mute || false,
        }
        const member = createMember(
          newMemberData,
          options.guild_id,
          [...guild.roles.values()].map((r) => r.raw),
          guild.owner_id
        )
        guild.members.set(options.user.id, member)

        if (cachedMember?.nick !== options.nick)
          eventHandlers.nicknameUpdate?.(guild, member, options.nick, cachedMember?.nick)
        const roleIDs = cachedMember?.roles || []

        roleIDs.forEach((id) => {
          if (!options.roles.includes(id)) eventHandlers.role_lost?.(guild, member, id)
        })

        options.roles.forEach((id) => {
          if (!roleIDs.includes(id)) eventHandlers.role_gained?.(guild, member, id)
        })

        return eventHandlers.guild_member_update?.(guild, member, cachedMember)
      }

      if (data.t === "GUILD_MEMBERS_CHUNK") {
        const options = data.d as GuildMemberChunkPayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        options.members.forEach((member) =>
          guild.members.set(
            member.user.id,
            createMember(
              member,
              options.guild_id,
              [...guild.roles.values()].map((r) => r.raw),
              guild.owner_id
            )
          )
        )
      }

      if (data.t && ["GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE"].includes(data.t)) {
        const options = data.d as GuildRolePayload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        if (data.t === "GUILD_ROLE_CREATE") {
          const role = createRole(options.role)
          const roles = guild.roles.set(options.role.id, role)
          guild.roles = roles
          return eventHandlers.roleCreate?.(guild, role)
        }

        const cached_role = guild.roles.get(options.role.id)
        if (!cached_role) return

        if (data.t === "GUILD_ROLE_DELETE") {
          const roles = guild.roles
          roles.delete(options.role.id)
          guild.roles = roles
          return eventHandlers.roleDelete?.(guild, cached_role)
        }

        if (data.t === "GUILD_ROLE_UPDATE") {
          const role = createRole(options.role)
          return eventHandlers.roleUpdate?.(guild, role, cached_role)
        }
      }

      if (data.t === "MESSAGE_CREATE") {
        const options = data.d as MessageCreateOptions
        const channel = cache.channels.get(options.channel_id)
        const message = createMessage(options)

        if (channel) {
          // channel.last_message_id = () => options.id
          // if (channel.messages().size > 99) {
          // TODO: LIMIT THIS TO 100 messages
          // }
        }
        return eventHandlers.messageCreate?.(message)
      }

      if (data.t && ["MESSAGE_DELETE", "MESSAGE_DELETE_BULK"].includes(data.t)) {
        const options = data.d as MessageDeletePayload
        const deletedMessages = data.t === "MESSAGE_DELETE" ? [options.id] : (data.d as MessageDeleteBulkPayload).ids

        const channel = cache.channels.get(options.channel_id)
        if (!channel) return

        deletedMessages.forEach((id) => {
          console.log(id)
          //   const message = channel.messages().get(id)
          //   if (message) {
          //     // TODO: update the messages cache
          //   }

          //   return eventHandlers.message_delete?.(message || { id, channel })
        })
      }

      if (data.t === "MESSAGE_UPDATE") {
        const options = data.d as MessageUpdatePayload
        const channel = cache.channels.get(options.channel_id)
        if (!channel) return

        // const cachedMessage = channel.messages().get(options.id)
        // return eventHandlers.message_update?.(message, cachedMessage)
      }

      if (data.t && ["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(data.t)) {
        const options = data.d as MessageReactionPayload
        const message = cache.messages.get(options.message_id)
        const isAdd = data.t === "MESSAGE_REACTION_ADD"

        if (message) {
          const previousReactions = message.reactions
          const reactionExisted = previousReactions?.find(
            (reaction) => reaction.emoji.id === options.emoji.id && reaction.emoji.name === options.emoji.name
          )
          if (reactionExisted) reactionExisted.count = isAdd ? reactionExisted.count + 1 : reactionExisted.count - 1
          else {
            const newReaction = {
              count: 1,
              me: options.user_id === botID,
              emoji: { ...options.emoji, id: options.emoji.id || undefined },
            }
            message.reactions = message.reactions ? [...message.reactions, newReaction] : [newReaction]
          }

          cache.messages.set(options.message_id, message)
        }

        return isAdd
          ? eventHandlers.reactionAdd?.(message || options, options.emoji, options.user_id)
          : eventHandlers.reactionRemove?.(message || options, options.emoji, options.user_id)
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        return eventHandlers.reactionRemoveAll?.(data.d as BaseMessageReactionPayload)
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
        return eventHandlers.reactionRemoveEmoji?.(data.d as MessageReactionRemoveEmojiPayload)
      }

      if (data.t === "PRESENCE_UPDATE") {
        return eventHandlers.presenceUpdate?.(data.d as PresenceUpdatePayload)
      }

      if (data.t === "TYPING_START") {
        return eventHandlers.typingStart?.(data.d as TypingStartPayload)
      }

      if (data.t === "USER_UPDATE") {
        const userData = data.d as UserPayload
        const cachedUser = cache.users.get(botID)
        const user = createUser(userData)
        cache.users.set(userData.id, user)
        return eventHandlers.botUpdate?.(user, cachedUser)
      }

      if (data.t === "VOICE_STATE_UPDATE") {
        const payload = data.d as VoiceStateUpdatePayload
        if (!payload.guild_id) return

        const guild = cache.guilds.get(payload.guild_id)
        if (!guild) return

        const member = guild.members.get(payload.user_id)
        if (!member) return

        const cached_state = guild.voice_states.find((state) => state.user_id === payload.user_id)
        // No cached state before so lets make one for em
        if (!cached_state) {
          guild.voice_states = [...guild.voice_states, payload]
          return
        }

        if (cached_state.channel_id !== payload.channel_id) {
          // Either joined or moved channels
          if (payload.channel_id) {
            cached_state.channel_id
              ? // Was in a channel before
                eventHandlers.voiceChannelSwitch?.(member, payload.channel_id, cached_state.channel_id)
              : // Was not in a channel before so user just joined
                eventHandlers.voiceChannelJoin?.(member, payload.channel_id)
          }
          // Left the channel
          else if (cached_state.channel_id) {
            eventHandlers.voiceChannelLeave?.(member, cached_state.channel_id)
          }
        }

        return eventHandlers.voiceStateUpdate?.(member, payload)
      }

      if (data.t === "WEBHOOKS_UPDATE") {
        const options = data.d as WebhookUpdatePayload
        return eventHandlers.webhooksUpdate?.(options.channel_id, options.guild_id)
      }

      return
    default:
      return
  }
}

export async function resumeConnection(payload: object, socket: WebSocket) {
  return setInterval(async () => {
    socket = await connectWebSocket(botGatewayData.url)
    await socket.send(
      JSON.stringify({
        op: GatewayOpcode.Resume,
        d: {
          ...payload,
          session_id: sessionID,
          seq: previousSequenceNumber,
        },
      })
    )
  }, 1000 * 15)
}
