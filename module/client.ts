import { endpoints } from "../constants/discord.ts"
import DiscordRequestManager from "./discord-request-manager.ts"
import { DiscordBotGatewayData, DiscordPayload, DiscordHeartbeatPayload, GatewayOpcode } from "../types/discord.ts"
import { spawnShards } from "./sharding-manager.ts"
import {
  connectWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts"
import { ClientOptions, FulfilledClientOptions, Event_Handlers } from "../types/options.ts"
import { CollectedMessageType } from "../types/message-type.ts"
import { send_constant_heartbeats, update_previous_sequence_number } from "./gateway.ts"
import { create_guild } from "../structures/guild.ts"
import { handle_internal_guild_create, handle_internal_guild_update } from "../events/guilds.ts"
import { Create_Guild_Payload, Guild_Delete_Payload } from "../types/guild.ts"
import { create_channel } from "../structures/channel.ts"
import { Channel_Create_Payload, Channel_Types } from "../types/channel.ts"
import {
  handle_internal_channel_create,
  handle_internal_channel_update,
  handle_internal_channel_delete
} from "../events/channels.ts"
import { cache } from "../utils/cache.ts"

const defaultOptions = {
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno"
  },
  compress: false
}

class Client {
  bot_id: string
  /** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
  token: string
  /** The Rate limit manager to handle all outgoing requests to discord. Not meant to be used by users. */
  discordRequestManager: DiscordRequestManager

  /** The options (with defaults) passed to the `Client` constructor. */
  options: FulfilledClientOptions
  event_handlers: Event_Handlers

  protected authorization: string

  constructor(options: ClientOptions) {
    // Assign some defaults to the options to make them fulfilled / not annoying to use.
    this.options = {
      ...defaultOptions,
      ...options,
      intents: options.intents.reduce((bits, next) => (bits |= next), 0)
    }
    this.bot_id = options.bot_id
    this.token = options.token
    this.authorization = `Bot ${this.options.token}`
    this.discordRequestManager = new DiscordRequestManager(this)
    this.event_handlers = options.event_handlers || {}

    this.bootstrap()
  }

  async bootstrap() {
    const data = (await this.discordRequestManager.get(endpoints.GATEWAY_BOT)) as DiscordBotGatewayData
    const socket = await connectWebSocket(data.url)
    this.collectMessages(socket)
    // Intial identify with the gateway
    await socket.send(
      JSON.stringify({
        op: GatewayOpcode.Identify,
        d: {
          token: this.options.token,
          // TODO: Let's get compression working, eh?
          compress: false,
          properties: this.options.properties,
          intents: this.options.intents
        }
      })
    )

    for await (const _message of this.connect(socket, data)) {
    }
  }

  async *collectMessages(socket: WebSocket) {
    for await (const message of socket.receive()) {
      console.log("collecting", message)
      if (typeof message === "string") {
        yield {
          type: CollectedMessageType.Message,
          data: JSON.parse(message)
        }
      } else if (isWebSocketCloseEvent(message)) {
        yield { type: CollectedMessageType.Close, ...message }
        return
      } else if (isWebSocketPingEvent(message)) {
        yield { type: CollectedMessageType.Ping }
      } else if (isWebSocketPongEvent(message)) {
        yield { type: CollectedMessageType.Pong }
      }
    }
  }

  /** Begins initial handshake, creates the websocket with Discord and spawns all necessary shards. */
  async *connect(socket: WebSocket, data: DiscordBotGatewayData) {
    for await (const message of this.collectMessages(socket)) {
      switch (message.type) {
        case CollectedMessageType.Ping:
          console.log("Ping!")
          yield message
          break
        case CollectedMessageType.Pong:
          console.log("Pong!")
          yield message
          break
        case CollectedMessageType.Close:
          console.log("Close :(", message)
          yield message
          break
        case CollectedMessageType.Message:
          this.handleDiscordPayload(message.data, socket)
          yield message
          break
      }
    }

    // Begin spawning all necessary shards
    spawnShards(data.shards)
  }

  handleDiscordPayload(data: DiscordPayload, socket: WebSocket) {
    // Update the sequence number if it is present so that heartbeating can be accurate
    if (data.s) update_previous_sequence_number(data.s)

    switch (data.op) {
      case GatewayOpcode.Hello:
        send_constant_heartbeats(socket, (data.d as DiscordHeartbeatPayload).heartbeat_interval)
        return
      case GatewayOpcode.HeartbeatACK:
        // Incase the user wants to listen to heartbeat responses
        return this.event_handlers.heartbeat?.()
      case GatewayOpcode.Reconnect:
        // TODO: Reconnect to the gateway https://discordapp.com/developers/docs/topics/gateway#reconnect
        return
      case GatewayOpcode.Dispatch:
        if (data.t === "READY") return this.event_handlers.ready?.()

        if (data.t === "CHANNEL_CREATE") {
          const channel = create_channel(data.d as Channel_Create_Payload, this)
          handle_internal_channel_create(channel)
          return this.event_handlers.channel_create?.(channel)
        }

        if (data.t === "CHANNEL_UPDATE") {
          const options = data.d as Channel_Create_Payload
          const cachedChannel = cache.channels.get(options.id)
          const channel = create_channel(options, this)
          handle_internal_channel_update(channel)
          if (!cachedChannel) return

          return this.event_handlers.channel_update?.(channel, cachedChannel)
        }

        if (data.t === "CHANNEL_DELETE") {
          const options = data.d as Channel_Create_Payload
          const cachedChannel = cache.channels.get(options.id)
          if (!cachedChannel) return
          if (cachedChannel.type() === Channel_Types.GUILD_VOICE) {
            const guild_id = cachedChannel.guild_id()
            if (!guild_id) return

            const guild = cache.guilds.get(guild_id)
            if (!guild) return

            guild.voice_states().forEach(vs => {
              if (vs.channel_id !== options.id) return
              this.event_handlers.voice_channel_leave?.(vs)
            })
            cache.guilds.set(guild.id(), {
              ...guild,
              voice_states: () => [...guild.voice_states().filter(vs => vs.channel_id !== options.id)]
            })
          }
          handle_internal_channel_delete(cachedChannel)

          return this.event_handlers.channel_delete?.(cachedChannel)
        }

        if (data.t === "GUILD_CREATE") {
          const guild = create_guild(data.d as Create_Guild_Payload, this)
          handle_internal_guild_create(guild)
          return this.event_handlers.guild_create?.(guild)
        }

        if (data.t === "GUILD_UPDATE") {
          const options = data.d as Create_Guild_Payload
          const cached_guild = cache.guilds.get(options.id)
          const guild = create_guild(options, this)
          handle_internal_guild_update(guild)
          if (!cached_guild) return

          return this.event_handlers.guild_update?.(guild, cached_guild)
        }

        if (data.t === 'GUILD_DELETE') {
          const options = data.d as Guild_Delete_Payload
          const guild = cache.guilds.get(options.id)
          if (!guild) return

          guild.channels.forEach((_channel, id) => cache.channels.delete(id))
          return options.unavailable ? undefined : this.event_handlers.guild_delete?.(guild)
        }

        return console.log("UNKNOWN EVENT:", data)
      default:
        return
    }
  }
}

export default Client
