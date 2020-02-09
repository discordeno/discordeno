import { endpoints } from '../constants/discord.ts'
import RequestManager from '../managers/RequestManager.ts'
import { DiscordBotGatewayData, DiscordPayload, DiscordHeartbeatPayload, GatewayOpcode } from '../types/discord.ts'
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
import { blue, green, red, yellow } from 'https://deno.land/std/fmt/colors.ts'
import { keepDiscordWebsocketAlive } from './websocket.ts'
import Gateway from './gateway.ts'
import { ClientOptions, FulfilledClientOptions } from '../types/options.ts'
import { CollectedMessageType } from '../types/message-type.ts'

class Client {
  /** The bot's token. This should never be used by end users. It is meant to be used internally to make requests to the Discord API. */
  token: string
  /** The Rate limit manager to handle all outgoing requests to discord. Not meant to be used by users. */
  RequestManager: RequestManager
  /** Creates and handles all the shards necessary for the bot. */
  ShardingManager: ShardingManager

  /** The options (with defaults) passed to the `Client` constructor. */
  options: FulfilledClientOptions

  protected authorization: string

  constructor(options: ClientOptions) {
    // Assign some defaults to the options to make them fulfilled / not annoying to use.
    this.options = Object.assign(
      {
        properties: {
          $os: '...',
          $browser: '...',
          $device: '...'
        },
        compress: false
      },
      options
    )
    this.token = options.token
    this.authorization = `Bot ${this.options.token}`
    this.RequestManager = new RequestManager(this, this.authorization)
    this.ShardingManager = new ShardingManager()
  }

  getGatewayData() {
    return this.RequestManager.get(endpoints.GATEWAY_BOT) as Promise<DiscordBotGatewayData>
  }

  createWebsocketConnection(data: DiscordBotGatewayData) {
    console.log({ data })
    return connectWebSocket(data.url)
  }

  async bootstrap() {
    const data = await this.getGatewayData()
    const socket = await this.createWebsocketConnection(data);
	const gateway = new Gateway(socket);
	const messages = this.collectMessages(gateway);
	await gateway.identify(this.options);
    return {
      data,
      socket,
	  gateway,
	  messages,
      connection: this.connect(gateway, data)
    }
  }

  async *collectMessages(gateway: Gateway) {
    const { socket } = gateway
    for await (const message of socket.receive()) {
      if (typeof message === 'string') {
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
  async *connect(gateway: Gateway, data: DiscordBotGatewayData): AsyncGenerator<{ type: CollectedMessageType, data?: DiscordPayload, action?: Promise<void> }> {
    for await (const message of this.collectMessages(gateway)) {
      switch (message.type) {
        case CollectedMessageType.Ping:
		  console.log('Ping!')
		  yield message;
          break
        case CollectedMessageType.Pong:
		  console.log('Pong!')
		  yield message;
          break
        case CollectedMessageType.Close:
		  console.log('Close :(', message)
		  yield message;
          break
        case CollectedMessageType.Message:
		await this.handleDiscordPayload(message.data, gateway);
		  yield message;
		console.log({ yay: true, ...message });
          break
      }
    }

    // Begin spawning all necessary shards
    this.spawnShards(data.shards)
  }

   handleDiscordPayload(data: DiscordPayload, gateway: Gateway) {
    switch (data.op) {
      case GatewayOpcode.Hello:
		  console.log('heartbeating...');
        return gateway.sendConstantHeartbeats((data.d as DiscordHeartbeatPayload).heartbeat_interval, data.s);
	}

	// Make all code paths return a promise for consistency.
	return Promise.resolve(undefined);
  }

  spawnShards(total: number, id = 1) {
    // this.ShardingManager.spawnShard(id);
    if (id < total) this.spawnShards(total, id + 1)
  }
}

export default Client
