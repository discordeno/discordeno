import { endpoints } from '../constants/discord.ts'
import RequestManager from '../managers/RequestManager.ts'
import { DiscordBotGateway, DiscordPayload, DiscordHeartbeatPayload } from '../types/discord.ts'
import ShardingManager from '../managers/ShardingManager.ts'
import {
  connectWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
  WebSocket
} from 'https://deno.land/std/ws/mod.ts'
// import { encode } from "https://deno.land/std/strings/mod.ts"
// import { BufReader } from "https://deno.land/std/io/bufio.ts"
// import { TextProtoReader } from "https://deno.land/std/textproto/mod.ts"
import { keepDiscordWebsocketAlive, updatePreviousSequenceNumber } from './websocket.ts'
import { logGreen, logRed, logYellow, logBlue } from '../utils/logger.ts'

class Client {
  /** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
  token: string
  /** The Rate limit manager to handle all outgoing requests to discord. Not meant to be used by users. */
  RequestManager: RequestManager
  /** Creates and handles all the shards necessary for the bot. */
  ShardingManager: ShardingManager

  constructor(token: string) {
    this.token = `Bot ${token}`
    this.RequestManager = new RequestManager(this, this.token)
    this.ShardingManager = new ShardingManager()
  }

  /** Begins initial handshake, creates the websocket with Discord and spawns all necessary shards. */
  async connect() {
    const data = (await this.RequestManager.get(endpoints.GATEWAY_BOT)) as DiscordBotGateway
    // Open a WS with the url from discord.
    const sock = await connectWebSocket(data.url)
    console.log(sock)
    logGreen("ws connected! (type 'close' to quit)")

    for await (const msg of sock.receive()) {
      if (typeof msg === 'string') {
        try {
          const json = JSON.parse(msg)
          this.handleDiscordPayload(json, sock)
        } catch {
          logRed(`Invalid JSON String send by discord: ${msg}`)
        }
        logYellow('< ' + msg)
      } else if (isWebSocketPingEvent(msg)) {
        logBlue('< ping')
      } else if (isWebSocketPongEvent(msg)) {
        logBlue('< pong')
      } else if (isWebSocketCloseEvent(msg)) {
        logRed(`closed: code=${msg.code}, reason=${msg.reason}`)
      }
    }

    // Begin spawning all necessary shards
    this.spawnShards(data.shards)
  }

  handleDiscordPayload(data: DiscordPayload, socket: WebSocket) {
    switch (data.op) {
      case 10: // Initial Heartbeat
        keepDiscordWebsocketAlive(socket, (data.d as DiscordHeartbeatPayload).heartbeat_interval, data.s)
        break
      case 11:
        updatePreviousSequenceNumber(data.s)
        break
    }
  }

  spawnShards(total: number, id = 1) {
    // this.ShardingManager.spawnShard(id);
    if (id < total) this.spawnShards(total, id + 1)
  }
}

export default Client
