import { endpoints } from "../constants/discord.ts"
import {
  DiscordBotGatewayData,
  DiscordPayload,
  DiscordHeartbeatPayload,
  GatewayOpcode,
  Webhook_Update_Payload,
  Presence_Update_Payload,
  Typing_Start_Payload,
  Voice_State_Update_Payload,
} from "../types/discord.ts"
// import { spawnShards } from "./sharding_manager.ts"
import { connectWebSocket, isWebSocketCloseEvent, WebSocket } from "https://deno.land/std@v0.41.0/ws/mod.ts"
import { Client_Options, Event_Handlers } from "../types/options.ts"
import { CollectedMessageType } from "../types/message-type.ts"
import { send_constant_heartbeats, update_previous_sequence_number } from "./gateway.ts"
import { create_guild } from "../structures/guild.ts"
import {
  handle_internal_guild_create,
  handle_internal_guild_update,
  handle_internal_guild_delete,
} from "../events/guilds.ts"
import {
  Create_Guild_Payload,
  Guild_Delete_Payload,
  Guild_Ban_Payload,
  Guild_Emojis_Update_Payload,
  Guild_Member_Add_Payload,
  Guild_Member_Update_Payload,
  Guild_Member_Chunk_Payload,
  Guild_Role_Payload,
  User_Payload,
} from "../types/guild.ts"
import { Channel_Create_Payload } from "../types/channel.ts"
import {
  handle_internal_channel_create,
  handle_internal_channel_update,
  handle_internal_channel_delete,
} from "../events/channels.ts"
import { cache } from "../utils/cache.ts"
import { create_user } from "../structures/user.ts"
import { create_member } from "../structures/member.ts"
import { create_role } from "../structures/role.ts"
import { create_message } from "../structures/message.ts"
import {
  Message_Create_Options,
  Message_Delete_Payload,
  Message_Delete_Bulk_Payload,
  Message_Update_Payload,
  Message_Reaction_Payload,
  Base_Message_Reaction_Payload,
  Message_Reaction_Remove_Emoji_Payload,
} from "../types/message.ts"
import { logRed } from "../utils/logger.ts"
import { Request_Manager } from "./request_manager.ts"

const defaultOptions = {
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno",
  },
  compress: false,
}

export let authorization = ""
export let bot_id = ""
/** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
export let token = ""
export let event_handlers: Event_Handlers = {}

export const create_client = async (data: Client_Options) => {
  // Assign some defaults to the options to make them fulfilled / not annoying to use.
  const options = {
    ...defaultOptions,
    ...data,
    intents: data.intents.reduce((bits, next) => (bits |= next), 0),
  }
  bot_id = data.bot_id
  token = data.token
  if (data.event_handlers) event_handlers = data.event_handlers
  authorization = `Bot ${data.token}`

  // Initial API connection to get info about bots connection
  const bot_gateway_data = (await Request_Manager.get(endpoints.GATEWAY_BOT)) as DiscordBotGatewayData
  const socket = await connectWebSocket(bot_gateway_data.url)
  collect_messages(socket)

  const payload = {
    token: data.token,
    // TODO: Let's get compression working, eh?
    compress: false,
    properties: options.properties,
    intents: options.intents,
    shards: [0, bot_gateway_data.shards],
  }
  // Intial identify with the gateway
  await socket.send(JSON.stringify({ op: GatewayOpcode.Identify, d: payload }))

  for await (const _message of connect(socket)) {
  }

  // spawnShards(bot_gateway_data, 1, socket, payload)
}

async function* collect_messages(socket: WebSocket) {
  for await (const message of socket.receive()) {
    if (typeof message === "string") {
      yield {
        type: CollectedMessageType.Message,
        data: JSON.parse(message),
      }
    } else if (isWebSocketCloseEvent(message)) {
      yield { type: CollectedMessageType.Close, ...message }
      return
    }
  }
}

/** Begins initial handshake, creates the websocket with Discord and spawns all necessary shards. */
async function* connect(socket: WebSocket) {
  for await (const message of collect_messages(socket)) {
    switch (message.type) {
      case CollectedMessageType.Ping:
        logRed("Ping!")
        yield message
        break
      case CollectedMessageType.Pong:
        logRed("Pong!")
        yield message
        break
      case CollectedMessageType.Close:
        logRed(`Close :( ${message}`)
        yield message
        break
      case CollectedMessageType.Message:
        handle_discord_payload(message.data, socket)
        yield message
        break
    }
  }
}

function handle_discord_payload(data: DiscordPayload, socket: WebSocket) {
  // Update the sequence number if it is present so that heartbeating can be accurate
  if (data.s) update_previous_sequence_number(data.s)

  switch (data.op) {
    case GatewayOpcode.Hello:
      send_constant_heartbeats(socket, (data.d as DiscordHeartbeatPayload).heartbeat_interval)
      return
    case GatewayOpcode.HeartbeatACK:
      // Incase the user wants to listen to heartbeat responses
      return event_handlers.heartbeat?.()
    case GatewayOpcode.Reconnect:
      // TODO: Reconnect to the gateway https://discordapp.com/developers/docs/topics/gateway#reconnect
      return
    case GatewayOpcode.Dispatch:
      if (data.t === "READY") {
        console.debug(data)
        return event_handlers.ready?.()
      }
      if (data.t === "CHANNEL_CREATE") return handle_internal_channel_create(data.d as Channel_Create_Payload)
      if (data.t === "CHANNEL_UPDATE") return handle_internal_channel_update(data.d as Channel_Create_Payload)
      if (data.t === "CHANNEL_DELETE") return handle_internal_channel_delete(data.d as Channel_Create_Payload)

      if (data.t === "GUILD_CREATE") {
        const guild = create_guild(data.d as Create_Guild_Payload)
        handle_internal_guild_create(guild)
        if (cache.unavailableGuilds.get(guild.id())) {
          cache.unavailableGuilds.delete(guild.id())
          return
        }
        return event_handlers.guild_create?.(guild)
      }

      if (data.t === "GUILD_UPDATE") {
        const options = data.d as Create_Guild_Payload
        const cached_guild = cache.guilds.get(options.id)
        const guild = create_guild(options)
        handle_internal_guild_update(guild)
        if (!cached_guild) return

        return event_handlers.guild_update?.(guild, cached_guild)
      }

      if (data.t === "GUILD_DELETE") {
        const options = data.d as Guild_Delete_Payload
        const guild = cache.guilds.get(options.id)
        if (!guild) return

        guild.channels.forEach((_channel, id) => cache.channels.delete(id))
        if (options.unavailable) return cache.unavailableGuilds.set(options.id, Date.now())

        handle_internal_guild_delete(guild)
        return event_handlers.guild_delete?.(guild)
      }

      if (data.t && ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE"].includes(data.t)) {
        const options = data.d as Guild_Ban_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const user = create_user(options.user)
        return data.t === "GUILD_BAN_ADD"
          ? event_handlers.guild_ban_add?.(guild, user)
          : event_handlers.guild_ban_remove?.(guild, user)
      }

      if (data.t === "GUILD_EMOJIS_UPDATE") {
        const options = data.d as Guild_Emojis_Update_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const cached_emojis = guild.emojis()
        guild.emojis = () => options.emojis

        return event_handlers.guild_emojis_update?.(guild, options.emojis, cached_emojis)
      }

      if (data.t === "GUILD_MEMBER_ADD") {
        const options = data.d as Guild_Member_Add_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const member_count = guild.member_count() + 1
        guild.member_count = () => member_count
        const member = create_member(
          options,
          options.guild_id,
          [...guild.roles().values()].map((role) => role.raw()),
          guild.owner_id()
        )
        guild.members.set(options.user.id, member)

        return event_handlers.guild_member_add?.(guild, member)
      }

      if (data.t === "GUILD_MEMBER_REMOVE") {
        const options = data.d as Guild_Ban_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const member_count = guild.member_count() - 1
        guild.member_count = () => member_count

        const member = guild.members.get(options.user.id)
        return event_handlers.guild_member_remove?.(guild, member || create_user(options.user))
      }

      if (data.t === "GUILD_MEMBER_UPDATE") {
        const options = data.d as Guild_Member_Update_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        const cached_member = guild.members.get(options.user.id)

        const new_member_data = {
          ...options,
          premium_since: options.premium_since || undefined,
          joined_at: new Date(cached_member?.joined_at() || Date.now()).toISOString(),
          deaf: cached_member?.deaf() || false,
          mute: cached_member?.mute() || false,
        }
        const member = create_member(
          new_member_data,
          options.guild_id,
          [...guild.roles().values()].map((r) => r.raw()),
          guild.owner_id()
        )
        guild.members.set(options.user.id, member)

        if (cached_member?.nick() !== options.nick)
          event_handlers.nickname_update?.(guild, member, options.nick, cached_member?.nick())
        const role_ids = cached_member?.roles() || []

        role_ids.forEach((id) => {
          if (!options.roles.includes(id)) event_handlers.role_lost?.(guild, member, id)
        })

        options.roles.forEach((id) => {
          if (!role_ids.includes(id)) event_handlers.role_gained?.(guild, member, id)
        })

        return event_handlers.guild_member_update?.(guild, member, cached_member)
      }

      if (data.t === "GUILD_MEMBERS_CHUNK") {
        const options = data.d as Guild_Member_Chunk_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        options.members.forEach((member) =>
          guild.members.set(
            member.user.id,
            create_member(
              member,
              options.guild_id,
              [...guild.roles().values()].map((r) => r.raw()),
              guild.owner_id()
            )
          )
        )
      }

      if (data.t && ["GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE"].includes(data.t)) {
        const options = data.d as Guild_Role_Payload
        const guild = cache.guilds.get(options.guild_id)
        if (!guild) return

        if (data.t === "GUILD_ROLE_CREATE") {
          const role = create_role(options.role)
          const roles = guild.roles().set(options.role.id, role)
          guild.roles = () => roles
          return event_handlers.role_create?.(guild, role)
        }

        const cached_role = guild.roles().get(options.role.id)
        if (!cached_role) return

        if (data.t === "GUILD_ROLE_DELETE") {
          const roles = guild.roles()
          roles.delete(options.role.id)
          guild.roles = () => roles
          return event_handlers.role_delete?.(guild, cached_role)
        }

        if (data.t === "GUILD_ROLE_UPDATE") {
          const role = create_role(options.role)
          return event_handlers.role_update?.(guild, role, cached_role)
        }
      }

      if (data.t === "MESSAGE_CREATE") {
        const options = data.d as Message_Create_Options
        const message = create_message(options)
        const channel = message.channel()
        if (channel) {
          // channel.last_message_id = () => options.id
          // if (channel.messages().size > 99) {
          // TODO: LIMIT THIS TO 100 messages
          // }
        }
        return event_handlers.message_create?.(message)
      }

      if (data.t && ["MESSAGE_DELETE", "MESSAGE_DELETE_BULK"].includes(data.t)) {
        const options = data.d as Message_Delete_Payload
        const deleted_messages =
          data.t === "MESSAGE_DELETE" ? [options.id] : (data.d as Message_Delete_Bulk_Payload).ids

        const channel = cache.channels.get(options.channel_id)
        if (!channel) return

        deleted_messages.forEach((id) => {
          console.log(id)
          //   const message = channel.messages().get(id)
          //   if (message) {
          //     // TODO: update the messages cache
          //   }

          //   return event_handlers.message_delete?.(message || { id, channel })
        })
      }

      if (data.t === "MESSAGE_UPDATE") {
        const options = data.d as Message_Update_Payload
        const channel = cache.channels.get(options.channel_id)
        if (!channel) return

        // const cachedMessage = channel.messages().get(options.id)
        // return event_handlers.message_update?.(message, cachedMessage)
      }

      if (data.t && ["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(data.t)) {
        const options = data.d as Message_Reaction_Payload
        const message = cache.messages.get(options.message_id)
        const isAdd = data.t === "MESSAGE_REACTION_ADD"

        if (message) {
          const previous_reactions = message.reactions()
          const reaction_existed = previous_reactions.find(
            (reaction) => reaction.emoji.id === options.emoji.id && reaction.emoji.name === options.emoji.name
          )
          if (reaction_existed) reaction_existed.count = isAdd ? reaction_existed.count + 1 : reaction_existed.count - 1
          else
            message.reactions = () => [
              ...message.reactions(),
              {
                count: 1,
                me: options.user_id === bot_id,
                emoji: { ...options.emoji, id: options.emoji.id || undefined },
              },
            ]

          cache.messages.set(options.message_id, message)
        }

        return isAdd
          ? event_handlers.reaction_add?.(message || options, options.emoji, options.user_id)
          : event_handlers.reaction_remove?.(message || options, options.emoji, options.user_id)
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        return event_handlers.reaction_remove_all?.(data.d as Base_Message_Reaction_Payload)
      }

      if (data.t === "MESSAGE_REACTION_REMOVE_EMOJI") {
        return event_handlers.reaction_remove_emoji?.(data.d as Message_Reaction_Remove_Emoji_Payload)
      }

      if (data.t === "PRESENCE_UPDATE") {
        return event_handlers.presence_update?.(data.d as Presence_Update_Payload)
      }

      if (data.t === "TYPING_START") {
        return event_handlers.typing_start?.(data.d as Typing_Start_Payload)
      }

      if (data.t === "USER_UPDATE") {
        const user_data = data.d as User_Payload
        const cached_user = cache.users.get(bot_id)
        const user = create_user(user_data)
        cache.users.set(user_data.id, user)
        return event_handlers.bot_update?.(user, cached_user)
      }

      if (data.t === "VOICE_STATE_UPDATE") {
        const payload = data.d as Voice_State_Update_Payload
        if (!payload.guild_id) return

        const guild = cache.guilds.get(payload.guild_id)
        if (!guild) return

        const member = guild.members.get(payload.user_id)
        if (!member) return

        const cached_state = guild.voice_states().find((state) => state.user_id === payload.user_id)
        // No cached state before so lets make one for em
        if (!cached_state) return (guild.voice_states = () => [...guild.voice_states(), payload])

        if (cached_state.channel_id !== payload.channel_id) {
          // Either joined or moved channels
          if (payload.channel_id) {
            cached_state.channel_id
              ? // Was in a channel before
                event_handlers.voice_channel_switch?.(member, payload.channel_id, cached_state.channel_id)
              : // Was not in a channel before so user just joined
                event_handlers.voice_channel_join?.(member, payload.channel_id)
          }
          // Left the channel
          else if (cached_state.channel_id) {
            event_handlers.voice_channel_leave?.(member, cached_state.channel_id)
          }
        }

        return event_handlers.voice_state_update?.(member, payload)
      }

      if (data.t === "WEBHOOKS_UPDATE") {
        const options = data.d as Webhook_Update_Payload
        return event_handlers.webhooks_update?.(options.channel_id, options.guild_id)
      }

      return event_handlers.raw?.(data)
    default:
      return
  }
}

export default create_client
