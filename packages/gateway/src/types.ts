import type { ActivityTypes, Camelize, DiscordActivity, DiscordGatewayPayload, GatewayOpcodes, PresenceStatus } from '@discordeno/types'
import type Shard from './Shard.js'

export enum ShardState {
  /** Shard is fully connected to the gateway and receiving events from Discord. */
  Connected = 0,
  /** Shard started to connect to the gateway. This is only used if the shard is not currently trying to identify or resume. */
  Connecting = 1,
  /** Shard got disconnected and reconnection actions have been started. */
  Disconnected = 2,
  /** The shard is connected to the gateway but only heartbeating. At this state the shard has not been identified with discord. */
  Unidentified = 3,
  /** Shard is trying to identify with the gateway to create a new session. */
  Identifying = 4,
  /** Shard is trying to resume a session with the gateway. */
  Resuming = 5,
  /** Shard got shut down studied or due to a not (self) fixable error and may not attempt to reconnect on its own. */
  Offline = 6,
}

export enum TransportCompression {
  /**
   * ZLib-Stream Transport Compression.
   *
   * @remarks
   * Uses `node:zlib` to decompress the payloads
   *
   * @see https://discord.com/developers/docs/topics/gateway#zlibstream
   */
  zlib = 'zlib-stream',
  /**
   * ZStd-Stream Transport Compression.
   *
   * @remarks
   * Uses `fzstd` to decompress the payloads. `fzstd` is an optional dependency, it is required to be installed for this compression.
   *
   * @see https://discord.com/developers/docs/topics/gateway#zstdstream
   */
  zstd = 'zstd-stream',
}

export interface ShardGatewayConfig {
  /**
   * Whatever to enable Payload compression.
   *
   * @remarks
   * This is compatible with {@link transportCompression}
   *
   * @default false
   *
   * @see https://discord.com/developers/docs/topics/gateway#payload-compression
   */
  compress: boolean
  /**
   * What Transport Compression should be use
   *
   * @default null
   *
   * @see https://discord.com/developers/docs/topics/gateway#transport-compression
   */
  transportCompression: TransportCompression | null
  /** The calculated intent value of the events which the shard should receive.
   *
   * @default 0
   */
  intents: number
  /** Identify properties to use */
  properties: {
    /** Operating system the shard runs on.
     *
     * @default "darwin" | "linux" | "windows"
     */
    os: string
    /** The "browser" where this shard is running on.
     *
     * @default "Discordeno"
     */
    browser: string
    /** The device on which the shard is running.
     *
     * @default "Discordeno"
     */
    device: string
  }
  /** Bot token which is used to connect to Discord */
  token: string
  /** The URL of the gateway which should be connected to.
   *
   * @default "wss://gateway.discord.gg"
   */
  url: string
  /** The gateway version which should be used.
   *
   * @default 10
   */
  version: number
  /**
   * The total number of shards to connect to across the entire bot.
   * @default 1
   */
  totalShards: number
}

export interface ShardHeart {
  /** Whether or not the heartbeat was acknowledged by Discord in time. */
  acknowledged: boolean
  /** Interval between heartbeats requested by Discord. */
  interval: number
  /** Id of the interval, which is used for sending the heartbeats. */
  intervalId?: NodeJS.Timeout
  /** Unix (in milliseconds) timestamp when the last heartbeat ACK was received from Discord. */
  lastAck?: number
  /** Unix timestamp (in milliseconds) when the last heartbeat was sent. */
  lastBeat?: number
  /** Round trip time (in milliseconds) from Shard to Discord and back.
   * Calculated using the heartbeat system.
   * Note: this value is undefined until the first heartbeat to Discord has happened.
   */
  rtt?: number
  /** Id of the timeout which is used for sending the first heartbeat to Discord since it's "special". */
  timeoutId?: NodeJS.Timeout
}

export interface ShardEvents {
  /** A heartbeat has been send. */
  heartbeat?: (shard: Shard) => unknown
  /** A heartbeat ACK was received. */
  heartbeatAck?: (shard: Shard) => unknown
  /** Shard has received a Hello payload. */
  hello?: (shard: Shard) => unknown
  /** The Shards session has been invalidated. */
  invalidSession?: (shard: Shard, resumable: boolean) => unknown
  /** The shard has started a resume action. */
  resuming?: (shard: Shard) => unknown
  /** The shard has successfully resumed an old session. */
  resumed?: (shard: Shard) => unknown
  /** Discord has requested the Shard to reconnect. */
  requestedReconnect?: (shard: Shard) => unknown
  /** The shard started to connect to Discord's gateway. */
  connecting?: (shard: Shard) => unknown
  /** The shard is connected with Discord's gateway. */
  connected?: (shard: Shard) => unknown
  /** The shard has been disconnected from Discord's gateway. */
  disconnected?: (shard: Shard) => unknown
  /** The shard has started to identify itself to Discord. */
  identifying?: (shard: Shard) => unknown
  /** The shard has successfully been identified itself with Discord. */
  identified?: (shard: Shard) => unknown
  /** The shard has received a message from Discord. */
  message?: (shard: Shard, payload: Camelize<DiscordGatewayPayload>) => unknown
}

export enum ShardSocketCloseCodes {
  /** A regular Shard shutdown. */
  Shutdown = 3000,
  /** A resume has been requested and therefore the old connection needs to be closed. */
  ResumeClosingOldConnection = 3024,
  /**
   * Did not receive a heartbeat ACK in time.
   * Closing the shard and creating a new session.
   */
  ZombiedConnection = 3010,
  /** Discordeno's gateway tests hae been finished, therefore the Shard can be turned off. */
  TestingFinished = 3064,
  /** Special close code reserved for Discordeno's zero-downtime resharding system. */
  Resharded = 3065,
  /** Shard is re-identifying therefore the old connection needs to be closed. */
  ReIdentifying = 3066,
}

export interface ShardSocketRequest {
  /** The OP-Code for the payload to send. */
  op: GatewayOpcodes
  /** Payload data. */
  d: unknown
}

/** https://discord.com/developers/docs/topics/gateway-events#update-presence */
export interface BotStatusUpdate {
  // /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  since: number | null
  /** The user's activities */
  activities: BotActivity[]
  /** The user's new status */
  status: keyof typeof PresenceStatus
}

/** https://discord.com/developers/docs/topics/gateway-events#activity-object */
export interface BotActivity {
  name: string
  type: ActivityTypes
  url?: string
}

/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildId: string
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null
  /** Is the client muted */
  selfMute: boolean
  /** Is the client deafened */
  selfDeaf: boolean
}

/** https://discord.com/developers/docs/topics/gateway-events#update-presence */
export interface StatusUpdate {
  // /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
  // since: number | null;
  /** The user's activities */
  activities?: Camelize<Omit<DiscordActivity, 'created_at'>[]>
  /** The user's new status */
  status: keyof typeof PresenceStatus
  // /** Whether or not the client is afk */
  // afk: boolean;
}
