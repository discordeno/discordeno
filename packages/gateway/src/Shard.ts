import { Buffer } from 'node:buffer'
import { Inflate, createInflate, inflateSync, constants as zlibConstants } from 'node:zlib'
import type { DiscordGatewayPayload, DiscordHello, DiscordReady } from '@discordeno/types'
import { GatewayCloseEventCodes, GatewayOpcodes } from '@discordeno/types'
import { LeakyBucket, camelize, delay, logger } from '@discordeno/utils'
import type { Decompress as ZstdDecompress } from 'fzstd'
import NodeWebSocket from 'ws'
import {
  type BotStatusUpdate,
  type ShardEvents,
  type ShardGatewayConfig,
  type ShardHeart,
  ShardSocketCloseCodes,
  type ShardSocketRequest,
  ShardState,
  TransportCompression,
} from './types.js'

const ZLIB_SYNC_FLUSH = new Uint8Array([0x0, 0x0, 0xff, 0xff])

let fzstd: typeof import('fzstd')

/** Since fzstd is an optional dependency, we need to import it lazily */
async function getFZStd() {
  return (fzstd ??= await import('fzstd'))
}

export class DiscordenoShard {
  /** The id of the shard */
  id: number
  /** The connection config details that this shard will used to connect to discord. */
  connection: ShardGatewayConfig
  /** This contains all the heartbeat information */
  heart: ShardHeart
  /** The maximum of requests which can be send to discord per rate limit tick. Typically this value should not be changed. */
  maxRequestsPerRateLimitTick: number = 120
  /** The previous payload sequence number. */
  previousSequenceNumber: number | null = null
  /** In which interval (in milliseconds) the gateway resets it's rate limit. */
  rateLimitResetInterval: number = 60000
  /** Current session id of the shard if present. */
  sessionId?: string
  /** This contains the WebSocket connection to Discord, if currently connected. */
  socket?: WebSocket
  /** Current internal state of the this. */
  state = ShardState.Offline
  /** The url provided by discord to use when resuming a connection for this this. */
  resumeGatewayUrl: string = ''
  /** The shard related event handlers. */
  events: ShardEvents = {}
  /** Cache for pending gateway requests which should have been send while the gateway went offline. */
  offlineSendQueue: (() => void)[] = []
  /** Resolve internal waiting states. Mapped by SelectedEvents => ResolveFunction */
  resolves = new Map<'READY' | 'RESUMED' | 'INVALID_SESSION', (payload: DiscordGatewayPayload) => void>()
  /** Shard bucket. Only access this if you know what you are doing. Bucket for handling shard request rate limits. */
  bucket: LeakyBucket
  /** Logger for the bucket */
  logger: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** Text decoder used for compressed payloads */
  textDecoder = new TextDecoder()
  /** ZLib Inflate instance for ZLib-stream transport payloads */
  inflate?: Inflate
  /** ZLib inflate buffer */
  inflateBuffer: Uint8Array | null = null
  /** ZStd Decompress instance for ZStd-stream transport payloads */
  zstdDecompress?: ZstdDecompress
  /** Queue for compressed payloads for Zstd Decompress */
  decompressionPromisesQueue: ((data: DiscordGatewayPayload) => void)[] = []

  constructor(options: ShardCreateOptions) {
    this.id = options.id
    this.connection = options.connection
    this.events = options.events
    this.logger = options.logger ?? logger

    this.heart = {
      acknowledged: false,
      interval: 45000,
    }

    if (options.requestIdentify) this.requestIdentify = options.requestIdentify
    if (options.shardIsReady) this.shardIsReady = options.shardIsReady
    if (options.makePresence) this.makePresence = options.makePresence

    this.bucket = new LeakyBucket({
      max: this.calculateSafeRequests(),
      refillAmount: this.calculateSafeRequests(),
      refillInterval: 60000,
      logger: this.logger,
    })
  }

  /** The gateway configuration which is used to connect to Discord. */
  get gatewayConfig(): ShardGatewayConfig {
    return this.connection
  }

  /** The url to connect to. Initially this is the discord gateway url, and then is switched to resume gateway url once a READY is received. */
  get connectionUrl(): string {
    // Use || and not ?? here. ?? will cause a bug.
    return this.resumeGatewayUrl || this.gatewayConfig.url
  }

  /** Calculate the amount of requests which can safely be made per rate limit interval, before the gateway gets disconnected due to an exceeded rate limit. */
  calculateSafeRequests(): number {
    // * 2 adds extra safety layer for discords OP 1 requests that we need to respond to
    const safeRequests = this.maxRequestsPerRateLimitTick - Math.ceil(this.rateLimitResetInterval / this.heart.interval) * 2

    return safeRequests < 0 ? 0 : safeRequests
  }

  async checkOffline(highPriority: boolean): Promise<void> {
    if (this.isOpen()) return

    return await new Promise<void>((resolve) => {
      // Higher priority requests get added at the beginning of the array.
      if (highPriority) this.offlineSendQueue.unshift(resolve)
      else this.offlineSendQueue.push(resolve)
    })
  }

  /** Close the socket connection to discord if present. */
  close(code: number, reason: string): void {
    if (this.socket?.readyState !== NodeWebSocket.OPEN) return

    this.socket?.close(code, reason)
  }

  /** Connect the shard with the gateway and start heartbeating. This will not identify the shard to the gateway. */
  async connect(): Promise<DiscordenoShard> {
    // Only set the shard to `Connecting` state,
    // if the connection request does not come from an identify or resume action.
    if (![ShardState.Identifying, ShardState.Resuming].includes(this.state)) {
      this.state = ShardState.Connecting
    }

    this.events.connecting?.(this)

    const url = new URL(this.connectionUrl)
    url.searchParams.set('v', this.gatewayConfig.version.toString())
    url.searchParams.set('encoding', 'json')

    // Set the compress url param and initialize the decompression contexts
    if (this.gatewayConfig.transportCompression) {
      url.searchParams.set('compress', this.gatewayConfig.transportCompression)

      if (this.gatewayConfig.transportCompression === TransportCompression.zlib) {
        this.inflateBuffer = null
        this.inflate = createInflate({
          finishFlush: zlibConstants.Z_SYNC_FLUSH,
          chunkSize: 64 * 1024,
        })

        this.inflate.on('error', (e) => {
          this.logger.error('The was an error in decompressing a ZLib compressed payload', e)
        })

        this.inflate.on('data', (data) => {
          if (!(data instanceof Uint8Array)) return

          if (this.inflateBuffer) {
            const newBuffer = new Uint8Array(this.inflateBuffer.byteLength + data.byteLength)
            newBuffer.set(this.inflateBuffer)
            newBuffer.set(data, this.inflateBuffer.byteLength)
            this.inflateBuffer = newBuffer

            return
          }

          this.inflateBuffer = data
        })
      }

      if (this.gatewayConfig.transportCompression === TransportCompression.zstd) {
        const fzstd = await getFZStd().catch(() => {
          this.logger.warn('[Shard] "fzstd" is not installed. Disabled transport compression.')
          url.searchParams.delete('compress')

          return null
        })

        if (fzstd) {
          this.zstdDecompress = new fzstd.Decompress((data) => {
            const decodedData = this.textDecoder.decode(data)
            const parsedData = JSON.parse(decodedData)
            this.decompressionPromisesQueue.shift()?.(parsedData)
          })
        }
      }
    }

    if (this.gatewayConfig.compress && this.gatewayConfig.transportCompression) {
      this.logger.warn('[Shard] Payload compression has been disabled since transport compression is enabled as well.')
      this.gatewayConfig.compress = false
    }

    // We check for built-in WebSocket implementations in Bun or Deno, NodeJS v22 has an implementation too but it seems to be less optimized so for now it is better to use the ws npm package
    const shouldUseBuiltin = Reflect.has(globalThis, 'WebSocket') && (Reflect.has(globalThis, 'Bun') || Reflect.has(globalThis, 'Deno'))

    // @ts-expect-error NodeWebSocket doesn't support "dispatchEvent", and while we don't use it, it is required on the "WebSocket" type
    const socket: WebSocket = shouldUseBuiltin ? new WebSocket(url) : new NodeWebSocket(url)
    this.socket = socket

    // By default WebSocket will give us a Blob, this changes it so that it gives us an ArrayBuffer
    socket.binaryType = 'arraybuffer'

    socket.onerror = (event) => this.handleError(event)
    socket.onclose = (closeEvent) => this.handleClose(closeEvent)
    socket.onmessage = (messageEvent) => this.handleMessage(messageEvent)

    return await new Promise((resolve) => {
      socket.onopen = () => {
        // Only set the shard to `Unidentified` state if the connection request does not come from an identify or resume action.
        if (![ShardState.Identifying, ShardState.Resuming].includes(this.state)) {
          this.state = ShardState.Unidentified
        }

        this.events.connected?.(this)

        resolve(this)
      }
    })
  }

  /** Identify the shard to the gateway. If not connected, this will also connect the shard to the gateway. */
  async identify(): Promise<void> {
    // A new identify has been requested even though there is already a connection open.
    // Therefore we need to close the old connection and heartbeating before creating a new one.
    if (this.isOpen()) {
      this.logger.debug(`[Shard] Identifying open Shard #${this.id}, closing the connection`)
      this.close(ShardSocketCloseCodes.ReIdentifying, 'Re-identifying closure of old connection.')
    }

    this.state = ShardState.Identifying
    this.events.identifying?.(this)

    // It is possible that the shard is in Heartbeating state but not identified,
    // so check whether there is already a gateway connection existing.
    // If not we need to create one before we identify.
    if (!this.isOpen()) {
      await this.connect()
    }

    this.send(
      {
        op: GatewayOpcodes.Identify,
        d: {
          token: `Bot ${this.gatewayConfig.token}`,
          compress: this.gatewayConfig.compress,
          properties: this.gatewayConfig.properties,
          intents: this.gatewayConfig.intents,
          shard: [this.id, this.gatewayConfig.totalShards],
          presence: await this.makePresence(),
        },
      },
      true,
    )

    return await new Promise((resolve) => {
      this.resolves.set('READY', () => {
        this.events.identified?.(this)
        // Tells the manager that this shard is ready
        this.shardIsReady()
        resolve()
      })
      // When identifying too fast, Discord sends an invalid session payload.
      // This can safely be ignored though and the shard starts a new identify action.
      this.resolves.set('INVALID_SESSION', () => {
        this.resolves.delete('READY')
        resolve()
      })
    })
  }

  /** Check whether the connection to Discord is currently open. */
  isOpen(): boolean {
    return this.socket?.readyState === NodeWebSocket.OPEN
  }

  /** Attempt to resume the previous shards session with the gateway. */
  async resume(): Promise<void> {
    this.logger.debug(`[Shard] Resuming Shard #${this.id}`)

    // It has been requested to resume the Shards session.
    // It's possible that the shard is still connected with Discord's gateway therefore we need to forcefully close it.
    if (this.isOpen()) {
      this.logger.debug(`[Shard] Resuming open Shard #${this.id}, closing the connection`)
      this.close(ShardSocketCloseCodes.ResumeClosingOldConnection, 'Reconnecting the shard, closing old connection.')
    }

    // Shard has never identified, so we cannot resume.
    if (!this.sessionId) {
      this.logger.debug(`[Shard] Trying to resume Shard #${this.id} without the session id. Identifying the shard instead.`)

      await this.identify()
      return
    }

    this.state = ShardState.Resuming

    // Before we can resume, we need to create a new connection with Discord's gateway.
    await this.connect()

    this.logger.debug(`[Shard] Resuming Shard #${this.id} connected. Session id: ${this.sessionId} | Sequence: ${this.previousSequenceNumber}`)

    this.send(
      {
        op: GatewayOpcodes.Resume,
        d: {
          token: `Bot ${this.gatewayConfig.token}`,
          session_id: this.sessionId,
          seq: this.previousSequenceNumber ?? 0,
        },
      },
      true,
    )

    return await new Promise((resolve) => {
      this.resolves.set('RESUMED', () => resolve())

      // If it is attempted to resume with an invalid session id, Discord sends an invalid session payload
      // Not erroring here since it is easy that this happens, also it would be not catchable
      this.resolves.set('INVALID_SESSION', () => {
        this.resolves.delete('RESUMED')
        resolve()
      })
    })
  }

  /**
   * Send a message to Discord.
   * @param highPriority - Whether this message should be send asap.
   */
  async send(message: ShardSocketRequest, highPriority: boolean = false): Promise<void> {
    // Before acquiring a token from the bucket, check whether the shard is currently offline or not.
    // Else bucket and token wait time just get wasted.
    await this.checkOffline(highPriority)

    await this.bucket.acquire(highPriority)

    // It's possible, that the shard went offline after a token has been acquired from the bucket.
    await this.checkOffline(highPriority)

    this.socket?.send(JSON.stringify(message))
  }

  /** Shutdown the this. Forcefully disconnect the shard from Discord. The shard may not attempt to reconnect with Discord. */
  async shutdown(): Promise<void> {
    this.close(ShardSocketCloseCodes.Shutdown, 'Shard shutting down.')
    this.state = ShardState.Offline
  }

  /** Handle a gateway connection error */
  handleError(error: Event): void {
    this.logger.error(`[Shard] There was an error connecting Shard #${this.id}.`, error)
  }

  /** Handle a gateway connection close. */
  async handleClose(close: CloseEvent): Promise<void> {
    this.socket = undefined
    this.stopHeartbeating()

    // Clear the zlib/zstd data
    this.inflate = undefined
    this.zstdDecompress = undefined
    this.inflateBuffer = null
    this.decompressionPromisesQueue = []

    this.logger.debug(`[Shard] Shard #${this.id} closed with code ${close.code}${close.reason ? `, and reason: ${close.reason}` : ''}.`)

    switch (close.code) {
      case ShardSocketCloseCodes.TestingFinished: {
        this.state = ShardState.Offline
        this.events.disconnected?.(this)

        return
      }
      // On these codes a manual start will be done.
      case ShardSocketCloseCodes.Shutdown:
      case ShardSocketCloseCodes.ReIdentifying:
      case ShardSocketCloseCodes.Resharded:
      case ShardSocketCloseCodes.ResumeClosingOldConnection:
      case ShardSocketCloseCodes.ZombiedConnection: {
        this.state = ShardState.Disconnected
        this.events.disconnected?.(this)

        return
      }
      // When these codes are received something went really wrong.
      // On those we cannot start a reconnect attempt.
      case GatewayCloseEventCodes.AuthenticationFailed:
      case GatewayCloseEventCodes.InvalidShard:
      case GatewayCloseEventCodes.ShardingRequired:
      case GatewayCloseEventCodes.InvalidApiVersion:
      case GatewayCloseEventCodes.InvalidIntents:
      case GatewayCloseEventCodes.DisallowedIntents: {
        this.state = ShardState.Offline
        this.events.disconnected?.(this)

        throw new Error(close.reason || 'Discord gave no reason! GG! You broke Discord!')
      }
      // Gateway connection closes which require a new identify.
      case GatewayCloseEventCodes.NotAuthenticated:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.SessionTimedOut: {
        this.logger.debug(`[Shard] Shard #${this.id} closed requiring re-identify.`)
        this.state = ShardState.Identifying
        this.events.disconnected?.(this)

        await this.identify()
        return
      }
      // Gateway connection closes on which a resume is allowed.
      case GatewayCloseEventCodes.UnknownError:
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.AlreadyAuthenticated:
      default: {
        this.logger.info(`[Shard] Shard #${this.id} closed with code ${close.code}. Attempting to resume...`)
        // We don't want to get into an infinite loop where we resume forever, so if we were already resuming we identify instead
        this.state = this.state === ShardState.Resuming ? ShardState.Identifying : ShardState.Resuming
        this.events.disconnected?.(this)

        if (this.state === ShardState.Resuming) {
          await this.resume()
        } else {
          await this.identify()
        }

        return
      }
    }
  }

  /** Handle an incoming gateway message. */
  async handleMessage(message: MessageEvent): Promise<void> {
    // The ws npm package will use a Buffer, while the global built-in will use ArrayBuffer
    const isCompressed = message.data instanceof ArrayBuffer || message.data instanceof Buffer

    const data = isCompressed ? await this.decompressPacket(message.data) : (JSON.parse(message.data) as DiscordGatewayPayload)

    // Check if the decompression was not successful
    if (!data) return

    await this.handleDiscordPacket(data)
  }

  /**
   * Decompress a zlib/zstd compressed packet
   *
   * @private
   */
  async decompressPacket(data: ArrayBuffer | Buffer): Promise<DiscordGatewayPayload | null> {
    // A buffer is a Uint8Array under the hood. An ArrayBuffer is generic, so we need to create the Uint8Array that uses the whole ArrayBuffer
    const compressedData: Uint8Array = data instanceof Buffer ? data : new Uint8Array(data)

    if (this.gatewayConfig.transportCompression === TransportCompression.zlib) {
      if (!this.inflate) {
        this.logger.fatal('[Shard] zlib-stream transport compression was enabled but no instance of Inflate was found.')
        return null
      }

      // Alias, used to avoid some null checks in the Promise constructor
      const inflate = this.inflate

      const writePromise = new Promise<void>((resolve, reject) => {
        inflate.write(compressedData, 'binary', (error) => (error ? reject(error) : resolve()))
      })

      if (!endsWithMarker(compressedData, ZLIB_SYNC_FLUSH)) return null

      await writePromise

      if (!this.inflateBuffer) {
        this.logger.warn('[Shard] The ZLib inflate buffer was cleared at an unexpected moment.')
        return null
      }

      const decodedData = this.textDecoder.decode(this.inflateBuffer)
      this.inflateBuffer = null

      return JSON.parse(decodedData)
    }

    if (this.gatewayConfig.transportCompression === TransportCompression.zstd) {
      if (!this.zstdDecompress) {
        this.logger.fatal('[Shard] zstd-stream transport compression was enabled but no instance of Decompress was found.')
        return null
      }

      this.zstdDecompress.push(compressedData)

      const decompressionPromise = new Promise<DiscordGatewayPayload>((r) => this.decompressionPromisesQueue.push(r))
      return await decompressionPromise
    }

    if (this.gatewayConfig.compress) {
      const decompressed = inflateSync(compressedData)
      const decodedData = this.textDecoder.decode(decompressed)

      return JSON.parse(decodedData)
    }

    return null
  }

  /** Handles a incoming gateway packet. */
  async handleDiscordPacket(packet: DiscordGatewayPayload): Promise<void> {
    // Edge case start: https://github.com/discordeno/discordeno/issues/2311
    this.heart.lastAck = Date.now()
    this.heart.acknowledged = true
    // Edge case end!

    switch (packet.op) {
      case GatewayOpcodes.Heartbeat: {
        if (!this.isOpen()) return

        this.heart.lastBeat = Date.now()
        // Discord randomly sends this requiring an immediate heartbeat back.
        // Using a direct socket.send call here because heartbeat requests are reserved by us.
        this.socket?.send(
          JSON.stringify({
            op: GatewayOpcodes.Heartbeat,
            d: this.previousSequenceNumber,
          }),
        )
        this.events.heartbeat?.(this)

        break
      }
      case GatewayOpcodes.Hello: {
        const interval = (packet.d as DiscordHello).heartbeat_interval
        this.logger.debug(`[Shard] Shard #${this.id} received Hello`)
        this.startHeartbeating(interval)

        if (this.state !== ShardState.Resuming) {
          const currentQueue = [...this.bucket.queue]
          // HELLO has been send on a non resume action.
          // This means that the shard starts a new session,
          // therefore the rate limit interval has been reset too.
          this.bucket = new LeakyBucket({
            max: this.calculateSafeRequests(),
            refillInterval: 60000,
            refillAmount: this.calculateSafeRequests(),
            logger: this.logger,
          })

          // Queue should not be lost on a re-identify.
          this.bucket.queue.unshift(...currentQueue)
        }

        this.events.hello?.(this)

        break
      }
      case GatewayOpcodes.HeartbeatACK: {
        // Manually calculating the round trip time for users who need it.
        if (this.heart.lastBeat) {
          this.heart.rtt = this.heart.lastAck - this.heart.lastBeat
        }

        this.events.heartbeatAck?.(this)

        break
      }
      case GatewayOpcodes.Reconnect: {
        this.events.requestedReconnect?.(this)

        await this.resume()

        break
      }
      case GatewayOpcodes.InvalidSession: {
        const resumable = packet.d as boolean
        this.logger.debug(`[Shard] Received Invalid Session for Shard #${this.id} with resumable as ${resumable}`)

        this.events.invalidSession?.(this, resumable)

        // We need to wait for a random amount of time between 1 and 5
        // Reference: https://discord.com/developers/docs/topics/gateway#resuming
        await delay(Math.floor((Math.random() * 4 + 1) * 1000))

        this.resolves.get('INVALID_SESSION')?.(packet)
        this.resolves.delete('INVALID_SESSION')

        // When resumable is false we need to re-identify
        if (!resumable) {
          await this.requestIdentify()

          break
        }

        // The session is invalid but apparently it is resumable
        await this.resume()

        break
      }
    }

    switch (packet.t) {
      case 'RESUMED':
        this.state = ShardState.Connected
        this.events.resumed?.(this)

        this.logger.debug(`[Shard] Shard #${this.id} received RESUMED`)

        // Continue the requests which have been queued since the shard went offline.
        this.offlineSendQueue.forEach((resolve) => resolve())
        // Setting the length to 0 will delete the elements in it
        this.offlineSendQueue.length = 0

        this.resolves.get('RESUMED')?.(packet)
        this.resolves.delete('RESUMED')
        break
      case 'READY': {
        const payload = packet.d as DiscordReady

        // Important for future resumes.
        this.resumeGatewayUrl = payload.resume_gateway_url
        this.sessionId = payload.session_id

        this.state = ShardState.Connected

        this.logger.debug(`[Shard] Shard #${this.id} received READY`)

        // Continue the requests which have been queued since the shard went offline.
        // Important when this is a re-identify
        this.offlineSendQueue.forEach((resolve) => resolve())
        // Setting the length to 0 will delete the elements in it
        this.offlineSendQueue.length = 0

        this.resolves.get('READY')?.(packet)
        this.resolves.delete('READY')
        break
      }
    }

    // Update the sequence number if it is present
    // `s` can be either `null` or a `number`.
    // In order to prevent update misses when `s` is `0` we check against null.
    if (packet.s !== null) {
      this.previousSequenceNumber = packet.s
    }

    this.forwardToBot(packet)
  }

  forwardToBot(packet: DiscordGatewayPayload): void {
    // The necessary handling required for the Shards connection has been finished.
    // Now the event can be safely forwarded.
    this.events.message?.(this, camelize(packet))
  }

  /**
   * Override in order to make the shards presence.
   * async in case devs create the presence based on eg. database values.
   * Passing the shard's id there to make it easier for the dev to use this function.
   */
  async makePresence(): Promise<BotStatusUpdate | undefined> {
    return
  }

  /**
   * This function communicates with the management process, in order to know whether its free to identify.
   * When this function resolves, this means that the shard is allowed to send an identify payload to discord.
   */
  async requestIdentify(): Promise<void> {}

  /** This function communicates with the management process, in order to tell it can identify the next shard. */
  async shardIsReady(): Promise<void> {}

  /** Start sending heartbeat payloads to Discord in the provided interval. */
  startHeartbeating(interval: number): void {
    this.logger.debug(`[Shard] Start heartbeating on shard #${this.id}`)

    // If old heartbeast exist like after resume, clear the old ones.
    this.stopHeartbeating()

    this.heart.interval = interval

    // Only set the shard's state to `Unidentified`
    // if heartbeating has not been started due to an identify or resume action.
    if ([ShardState.Disconnected, ShardState.Offline].includes(this.state)) {
      this.logger.debug(`[Shard] Shard is disconnected or offline but the heartbeat was started #${this.id}`)
      this.state = ShardState.Unidentified
    }

    // The first heartbeat needs to be send with a random delay between `0` and `interval`
    // Using a `setTimeout(_, jitter)` here to accomplish that.
    // `Math.random()` can be `0` so we use `0.5` if this happens
    // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating
    const jitter = Math.ceil(this.heart.interval * (Math.random() || 0.5))

    this.heart.timeoutId = setTimeout(() => {
      this.logger.debug(`[Shard] Beginning heartbeating process for shard #${this.id}`)

      if (!this.isOpen()) return

      this.logger.debug(`[Shard] Heartbeating on shard #${this.id}. Previous sequence number: ${this.previousSequenceNumber}`)

      // Using a direct socket.send call here because heartbeat requests are reserved by us.
      this.socket?.send(
        JSON.stringify({
          op: GatewayOpcodes.Heartbeat,
          d: this.previousSequenceNumber,
        }),
      )

      this.heart.lastBeat = Date.now()
      this.heart.acknowledged = false

      // After the random heartbeat jitter we can start a normal interval.
      this.heart.intervalId = setInterval(async () => {
        if (!this.isOpen()) {
          this.logger.debug(`[Shard] Shard #${this.id} is not open, but attempted heartbeat, ignoring.`)
          return
        }

        // The Shard did not receive a heartbeat ACK from Discord in time,
        // therefore we have to assume that the connection has failed or got "zombied".
        // The Shard needs to start a re-identify action accordingly.
        // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
        if (!this.heart.acknowledged) {
          this.logger.debug(`[Shard] Heartbeat not acknowledged for shard #${this.id}. Assuming zombied connection.`)
          this.close(ShardSocketCloseCodes.ZombiedConnection, 'Zombied connection, did not receive an heartbeat ACK in time.')

          await this.resume()
          return
        }

        this.logger.debug(`[Shard] Heartbeating on shard #${this.id}. Previous sequence number: ${this.previousSequenceNumber}`)

        // Using a direct socket.send call here because heartbeat requests are reserved by us.
        this.socket?.send(
          JSON.stringify({
            op: GatewayOpcodes.Heartbeat,
            d: this.previousSequenceNumber,
          }),
        )

        this.heart.lastBeat = Date.now()
        this.heart.acknowledged = false

        this.events.heartbeat?.(this)
      }, this.heart.interval)
    }, jitter)
  }

  /** Stop the heartbeating process with discord. */
  stopHeartbeating(): void {
    // Clear the regular heartbeat interval.
    clearInterval(this.heart.intervalId)
    // It's possible that the Shard got closed before the first jittered heartbeat.
    // To go safe we should clear the related timeout too.
    clearTimeout(this.heart.timeoutId)
  }
}

/** Check if the buffer ends with the marker */
function endsWithMarker(buffer: Uint8Array, marker: Uint8Array) {
  if (buffer.length < marker.length) return false

  for (let i = 0; i < marker.length; i++) {
    if (buffer[buffer.length - marker.length + i] !== marker[i]) return false
  }

  return true
}

export interface ShardCreateOptions {
  /** The shard id */
  id: number
  /** The connection details */
  connection: ShardGatewayConfig
  /** The event handlers for events on the shard. */
  events: ShardEvents
  /** The logger for the shard */
  logger?: Pick<typeof logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal'>
  /** The handler to request a space to make an identify request. */
  requestIdentify?: () => Promise<void>
  /** The handler to alert the gateway manager that this shard has received a READY event. */
  shardIsReady?: () => Promise<void>
  /** Function to create the bot status to send on Identify requests */
  makePresence?: () => Promise<BotStatusUpdate | undefined>
}

export default DiscordenoShard
