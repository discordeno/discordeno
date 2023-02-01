import type { DiscordGatewayPayload, DiscordHello, DiscordReady } from '@discordeno/types'
import { GatewayCloseEventCodes, GatewayOpcodes } from '@discordeno/types'
import { camelize, createLeakyBucket, delay } from '@discordeno/utils'
import { inflateSync } from 'zlib'
import type { BotStatusUpdate, ShardEvents, ShardGatewayConfig, ShardHeart, ShardSocketRequest } from './types.js'
import { ShardSocketCloseCodes, ShardState } from './types.js'
import WebSocket from 'ws'

export class Shard {
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
  offlineSendQueue: Array<(_?: unknown) => void> = []
  /** Resolve internal waiting states. Mapped by SelectedEvents => ResolveFunction */
  resolves = new Map<'READY' | 'RESUMED' | 'INVALID_SESSION', (payload: DiscordGatewayPayload) => void>()
  /** Shard bucket. Only access this if you know what you are doing. Bucket for handling shard request rate limits. */
  bucket = createLeakyBucket({
    max: 120,
    refillInterval: 60000,
    refillAmount: 120
  })

  constructor (options: ShardCreateOptions) {
    this.id = options.id
    this.connection = options.connection
    this.events = options.events

    this.heart = {
      acknowledged: false,
      interval: 45000
    }
  }

  /** The gateway configuration which is used to connect to Discord. */
  get gatewayConfig (): ShardGatewayConfig {
    return this.connection
  }

  /** Calculate the amount of requests which can safely be made per rate limit interval, before the gateway gets disconnected due to an exceeded rate limit. */
  calculateSafeRequests (): number {
    // * 2 adds extra safety layer for discords OP 1 requests that we need to respond to
    const safeRequests = this.maxRequestsPerRateLimitTick - Math.ceil(this.rateLimitResetInterval / this.heart.interval) * 2

    return safeRequests < 0 ? 0 : safeRequests
  }

  async checkOffline (highPriority: boolean): Promise<void> {
    if (!this.isOpen()) {
      await new Promise((resolve) => {
        // Higher priority requests get added at the beginning of the array.
        if (highPriority) this.offlineSendQueue.unshift(resolve)
        else this.offlineSendQueue.push(resolve)
      })
    }
  }

  /** Close the socket connection to discord if present. */
  close (code: number, reason: string): void {
    if (this.socket?.readyState !== WebSocket.OPEN) return

    return this.socket?.close(code, reason)
  }

  /** Connect the shard with the gateway and start heartbeating. This will not identify the shard to the gateway. */
  async connect (): Promise<Shard> {
    // Only set the shard to `Connecting` state,
    // if the connection request does not come from an identify or resume action.
    if (![ShardState.Identifying, ShardState.Resuming].includes(this.state)) {
      this.state = ShardState.Connecting
    }
    this.events.connecting?.(this)

    let url = new URL(this.gatewayConfig.url)
    // If not connecting to a proxy but directly to discord need to handle resuming
    if (url.origin === 'wss://gateway.discord.gg') {
      if (this.state === ShardState.Resuming) {
        url = new URL(this.resumeGatewayUrl)
      }
      url.searchParams.set('v', this.gatewayConfig.version.toString())
      url.searchParams.set('encoding', 'json')
    }

    const socket = new WebSocket(url.toString())

    this.socket = socket

    // TODO: proper event handling
    socket.onerror = (event) => console.log({ error: event })

    socket.onclose = async (event) => await this.handleClose(event)

    socket.onmessage = async (message) => await this.handleMessage(message)

    return await new Promise((resolve) => {
      socket.onopen = () => {
        // Only set the shard to `Unidentified` state,
        // if the connection request does not come from an identify or resume action.
        if (![ShardState.Identifying, ShardState.Resuming].includes(this.state)) {
          this.state = ShardState.Unidentified
        }
        this.events.connected?.(this)

        resolve(this)
      }
    })
  }

  /** Identify the shard to the gateway. If not connected, this will also connect the shard to the gateway. */
  async identify (): Promise<void> {
    // A new identify has been requested even though there is already a connection open.
    // Therefore we need to close the old connection and heartbeating before creating a new one.
    if (this.isOpen()) {
      console.log(`CLOSING EXISTING SHARD: #${this.id}`)
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

    // Wait until an identify is free for this this.
    await this.requestIdentify()

    this.send(
      {
        op: GatewayOpcodes.Identify,
        d: {
          token: `Bot ${this.gatewayConfig.token}`,
          compress: this.gatewayConfig.compress,
          properties: this.gatewayConfig.properties,
          intents: this.gatewayConfig.intents,
          shard: [this.id, this.gatewayConfig.totalShards],
          presence: await this.makePresence?.()
        }
      },
      true
    )

    return await new Promise((resolve) => {
      this.resolves.set('READY', () => {
        this.events.identified?.(this)
        resolve()
      })
      // When identifying too fast,
      // Discord sends an invalid session payload.
      // This can safely be ignored though and the shard starts a new identify action.
      this.resolves.set('INVALID_SESSION', () => {
        this.resolves.delete('READY')
        resolve()
      })
    })
  }

  /** Check whether the connection to Discord is currently open. */
  isOpen (): boolean {
    return this.socket?.readyState === WebSocket.OPEN
  }

  /** Attempt to resume the previous shards session with the gateway. */
  async resume (): Promise<void> {
    //   gateway.debug("GW RESUMING", { shardId });
    // It has been requested to resume the Shards session.
    // It's possible that the shard is still connected with Discord's gateway therefore we need to forcefully close it.
    if (this.isOpen()) {
      this.close(ShardSocketCloseCodes.ResumeClosingOldConnection, 'Reconnecting the shard, closing old connection.')
    }

    // Shard has never identified, so we cannot resume.
    if (!this.sessionId) {
      // gateway.debug(
      //   "GW DEBUG",
      //   `[Error] Trying to resume a shard (id: ${shardId}) that was not first identified.`,
      // );

      return await this.identify()

      // throw new Error(`[SHARD] Trying to resume a shard (id: ${this.id}) which was never identified`);
    }

    this.state = ShardState.Resuming

    // Before we can resume, we need to create a new connection with Discord's gateway.
    await this.connect()

    this.send(
      {
        op: GatewayOpcodes.Resume,
        d: {
          token: `Bot ${this.gatewayConfig.token}`,
          session_id: this.sessionId,
          seq: this.previousSequenceNumber ?? 0
        }
      },
      true
    )

    return await new Promise((resolve) => {
      this.resolves.set('RESUMED', () => resolve())
      // If it is attempted to resume with an invalid session id,
      // Discord sends an invalid session payload
      // Not erroring here since it is easy that this happens, also it would be not catchable
      this.resolves.set('INVALID_SESSION', () => {
        this.resolves.delete('RESUMED')
        resolve()
      })
    })
  }

  /** Send a message to Discord.
   * @param {boolean} [highPriority=false] - Whether this message should be send asap.
   */
  async send (message: ShardSocketRequest, highPriority = false): Promise<void> {
    // Before acquiring a token from the bucket, check whether the shard is currently offline or not.
    // Else bucket and token wait time just get wasted.
    await this.checkOffline(highPriority)

    await this.bucket.acquire(1, highPriority)

    // It's possible, that the shard went offline after a token has been acquired from the bucket.
    await this.checkOffline(highPriority)

    this.socket?.send(JSON.stringify(message))
  }

  /** Shutdown the this. Forcefully disconnect the shard from Discord. The shard may not attempt to reconnect with Discord. */
  async shutdown (): Promise<void> {
    this.close(ShardSocketCloseCodes.Shutdown, 'Shard shutting down.')
    this.state = ShardState.Offline
  }

  /** Handle a gateway connection close. */
  async handleClose (close: WebSocket.CloseEvent): Promise<void> {
    //   gateway.debug("GW CLOSED", { shardId, payload: event });

    this.stopHeartbeating()

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

        // gateway.debug("GW CLOSED_RECONNECT", { shardId, payload: event });
        return
      }
      // Gateway connection closes which require a new identify.
      case GatewayCloseEventCodes.UnknownOpcode:
      case GatewayCloseEventCodes.NotAuthenticated:
      case GatewayCloseEventCodes.InvalidSeq:
      case GatewayCloseEventCodes.RateLimited:
      case GatewayCloseEventCodes.SessionTimedOut: {
        this.state = ShardState.Identifying
        this.events.disconnected?.(this)

        return await this.identify()
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
      // Gateway connection closes on which a resume is allowed.
      case GatewayCloseEventCodes.UnknownError:
      case GatewayCloseEventCodes.DecodeError:
      case GatewayCloseEventCodes.AlreadyAuthenticated:
      default: {
        this.state = ShardState.Resuming
        this.events.disconnected?.(this)

        return await this.resume()
      }
    }
  }

  /** Handle an incoming gateway message. */
  async handleMessage (message: WebSocket.MessageEvent): Promise<void> {
    let preProcessMessage = message.data

    // If message compression is enabled,
    // Discord might send zlib compressed payloads.
    if (this.gatewayConfig.compress && preProcessMessage instanceof Blob) {
      preProcessMessage = inflateSync(await preProcessMessage.arrayBuffer()).toString()
    }

    // Safeguard incase decompression failed to make a string.
    if (typeof preProcessMessage !== 'string') return

    const messageData = JSON.parse(preProcessMessage) as DiscordGatewayPayload

    // Edge case start: https://github.com/discordeno/discordeno/issues/2311
    this.heart.lastAck = Date.now()
    // Manually calculating the round trip time for users who need it.
    if (this.heart.lastBeat && !this.heart.acknowledged) {
      this.heart.rtt = this.heart.lastAck - this.heart.lastBeat
    }
    this.heart.acknowledged = true
    // Edge case end!

    switch (messageData.op) {
      case GatewayOpcodes.Heartbeat: {
        // TODO: can this actually happen
        if (!this.isOpen()) return

        this.heart.lastBeat = Date.now()
        // Discord randomly sends this requiring an immediate heartbeat back.
        // Using a direct socket.send call here because heartbeat requests are reserved by us.
        this.socket?.send(
          JSON.stringify({
            op: GatewayOpcodes.Heartbeat,
            d: this.previousSequenceNumber
          })
        )
        this.events.heartbeat?.(this)

        break
      }
      case GatewayOpcodes.Hello: {
        const interval = (messageData.d as DiscordHello).heartbeat_interval

        this.startHeartbeating(interval)

        if (this.state !== ShardState.Resuming) {
          // HELLO has been send on a non resume action.
          // This means that the shard starts a new session,
          // therefore the rate limit interval has been reset too.
          this.bucket = createLeakyBucket({
            max: this.calculateSafeRequests(),
            refillInterval: 60000,
            refillAmount: this.calculateSafeRequests(),
            // Waiting acquires should not be lost on a re-identify.
            waiting: this.bucket.waiting
          })
        }

        this.events.hello?.(this)

        break
      }
      case GatewayOpcodes.HeartbeatACK: {
        this.events.heartbeatAck?.(this)

        break
      }
      case GatewayOpcodes.Reconnect: {
        //   gateway.debug("GW RECONNECT", { shardId });

        this.events.requestedReconnect?.(this)

        await this.resume()

        break
      }
      case GatewayOpcodes.InvalidSession: {
        //   gateway.debug("GW INVALID_SESSION", { shardId, payload: messageData });
        const resumable = messageData.d as boolean

        this.events.invalidSession?.(this, resumable)

        // We need to wait for a random amount of time between 1 and 5
        // Reference: https://discord.com/developers/docs/topics/gateway#resuming
        await delay(Math.floor((Math.random() * 4 + 1) * 1000))

        this.resolves.get('INVALID_SESSION')?.(messageData)
        this.resolves.delete('INVALID_SESSION')

        // When resumable is false we need to re-identify
        if (!resumable) {
          await this.identify()

          break
        }

        // The session is invalid but apparently it is resumable
        await this.resume()

        break
      }
    }

    if (messageData.t === 'RESUMED') {
      // gateway.debug("GW RESUMED", { shardId });

      this.state = ShardState.Connected
      this.events.resumed?.(this)

      // Continue the requests which have been queued since the shard went offline.
      this.offlineSendQueue.map((resolve) => resolve())

      this.resolves.get('RESUMED')?.(messageData)
      this.resolves.delete('RESUMED')
    } else if (messageData.t === 'READY') {
      // Important for future resumes.

      const payload = messageData.d as DiscordReady

      this.resumeGatewayUrl = payload.resume_gateway_url

      this.sessionId = payload.session_id
      this.state = ShardState.Connected

      // Continue the requests which have been queued since the shard went offline.
      // Important when this is a re-identify
      this.offlineSendQueue.map((resolve) => resolve())

      this.resolves.get('READY')?.(messageData)
      this.resolves.delete('READY')
    }

    // Update the sequence number if it is present
    // `s` can be either `null` or a `number`.
    // In order to prevent update misses when `s` is `0` we check against null.
    if (messageData.s !== null) {
      this.previousSequenceNumber = messageData.s
    }

    // The necessary handling required for the Shards connection has been finished.
    // Now the event can be safely forwarded.
    this.events.message?.(this, camelize(messageData))
  }

  /**
   * Override in order to make the shards presence.
   * async in case devs create the presence based on eg. database values.
   * Passing the shard's id there to make it easier for the dev to use this function.
   */
  async makePresence (): Promise<BotStatusUpdate | undefined> {
    // eslint-disable-next-line no-useless-return
    return
  }

  /** This function communicates with the management process, in order to know whether its free to identify. When this function resolves, this means that the shard is allowed to send an identify payload to discord. */
  async requestIdentify (): Promise<void> {
    // TODO: how to handle this
    // return await options.requestIdentify(this.id)
  }

  /** Start sending heartbeat payloads to Discord in the provided interval. */
  startHeartbeating (interval: number): void {
    //   gateway.debug("GW HEARTBEATING_STARTED", { shardId, interval });

    this.heart.interval = interval

    // Only set the shard's state to `Unidentified`
    // if heartbeating has not been started due to an identify or resume action.
    if ([ShardState.Disconnected, ShardState.Offline].includes(this.state)) {
      this.state = ShardState.Unidentified
    }

    // The first heartbeat needs to be send with a random delay between `0` and `interval`
    // Using a `setTimeout(_, jitter)` here to accomplish that.
    // `Math.random()` can be `0` so we use `0.5` if this happens
    // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating
    const jitter = Math.ceil(this.heart.interval * (Math.random() || 0.5))
    this.heart.timeoutId = setTimeout(() => {
      if (!this.isOpen()) return;

      // Using a direct socket.send call here because heartbeat requests are reserved by us.
      this.socket?.send(
        JSON.stringify({
          op: GatewayOpcodes.Heartbeat,
          d: this.previousSequenceNumber
        })
      )

      this.heart.lastBeat = Date.now()
      this.heart.acknowledged = false

      // After the random heartbeat jitter we can start a normal interval.
      this.heart.intervalId = setInterval(async () => {
        if (!this.isOpen()) return;
        // gateway.debug("GW DEBUG", `Running setInterval in heartbeat file. Shard: ${shardId}`);

        // gateway.debug("GW HEARTBEATING", { shardId, shard: currentShard });

        // The Shard did not receive a heartbeat ACK from Discord in time,
        // therefore we have to assume that the connection has failed or got "zombied".
        // The Shard needs to start a re-identify action accordingly.
        // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
        if (!this.heart.acknowledged) {
          this.close(ShardSocketCloseCodes.ZombiedConnection, 'Zombied connection, did not receive an heartbeat ACK in time.')

          return await this.identify()
        }

        this.heart.acknowledged = false

        // Using a direct socket.send call here because heartbeat requests are reserved by us.
        this.socket?.send(
          JSON.stringify({
            op: GatewayOpcodes.Heartbeat,
            d: this.previousSequenceNumber
          })
        )

        this.heart.lastBeat = Date.now()

        this.events.heartbeat?.(this)
      }, this.heart.interval)
    }, jitter)
  }

  /** Stop the heartbeating process with discord. */
  stopHeartbeating (): void {
    // Clear the regular heartbeat interval.
    clearInterval(this.heart.intervalId)
    // It's possible that the Shard got closed before the first jittered heartbeat.
    // To go safe we should clear the related timeout too.
    clearTimeout(this.heart.timeoutId)
  }
}

export interface ShardCreateOptions {
  /** The shard id */
  id: number
  /** The connection details */
  connection: ShardGatewayConfig
  /** The event handlers for events on the shard. */
  events: ShardEvents
}

export default Shard
