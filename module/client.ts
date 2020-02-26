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
import { ClientOptions, FulfilledClientOptions } from "../types/options.ts"
import { CollectedMessageType } from "../types/message-type.ts"
import { send_constant_heartbeats, update_previous_sequence_number } from "./gateway.ts"

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
    this.discordRequestManager = new DiscordRequestManager(this, this.authorization)

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

    for await (const message of this.connect(socket, data)) {
      if (message.data?.op === GatewayOpcode.Hello) await message.action
      // if (message.data?.op === GatewayOpcode.HeartbeatACK) return this.options.eventHandlers.heartbeat()

      if (message.data?.t === "READY") {
        console.log("ready event was received")
        // this.options.eventHandlers.ready()
      }
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
  async *connect(
    socket: WebSocket,
    data: DiscordBotGatewayData
  ): AsyncGenerator<{ type: CollectedMessageType; data?: DiscordPayload; action?: Promise<void> }> {
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
    }
  }
}

export default Client
