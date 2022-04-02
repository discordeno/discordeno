import { StatusUpdate } from "../../helpers/misc/editBotStatus.ts";
import { DiscordGatewayPayload } from "../../types/discord.ts";
import { GatewayOpcodes } from "../../types/shared.ts";
import { LeakyBucket } from "../../util/bucket.ts";

export const MAX_GATEWAY_REQUESTS_PER_INTERVAL = 120;
export const GATEWAY_RATE_LIMIT_RESET_INTERVAL = 60_000; // 60 seconds
export const DEFAULT_HEARTBEAT_INTERVAL = 45000;

export interface Shard {
  // ----------
  // PROPERTIES
  // ----------

  /** The gateway configuration which is used to connect to Discord. */
  gatewayConfig: ShardGatewayConfig;
  /** This contains all the heartbeat information */
  heart: ShardHeart;
  /** Id of the shard. */
  id: number;
  /** The maximum of requests which can be send to discord per rate limit tick.
   * Typically this value should not be changed.
   */
  maxRequestsPerRateLimitTick: number;
  /** The previous payload sequence number. */
  previousSequenceNumber: number | null;
  /** In which interval (in milliseconds) the gateway resets it's rate limit. */
  rateLimitResetInterval: number;
  /** Current session id of the shard if present. */
  sessionId?: string;
  /** This contains the WebSocket connection to Discord, if currently connected. */
  socket?: WebSocket;
  /** Current internal state of the shard. */
  state: ShardState;
  /** The total amount of shards which are used to communicate with Discord. */
  totalShards: number;

  // ----------
  // METHODS
  // ----------

  /** The shard related event handlers. */
  event: ShardEvents;

  /** Calculate the amount of requests which can safely be made per rate limit interval,
   * before the gateway gets disconnected due to an exceeded rate limit.
   */
  calculateSafeRequests(): number;

  /** Close the socket connection to discord if present. */
  close(code: number, reason: string): void;

  /** Connect the shard with the gateway and start heartbeating.
   * This will not identify the shard to the gateway.
   */
  connect(): Promise<void>;

  /** Identify the shard to the gateway.
   * If not connected, this will also connect the shard to the gateway.
   */
  identify(): Promise<void>;

  /** Check whether the connection to Discord is currently open. */
  isOpen(): boolean;

  /** Function which can be overwritten in order to get the shards presence. */
  // This function allows to be async, in case the devs create the presence based on eg. database values.
  // Passing the shard's id there to make it easier for the dev to use this function.
  makePresence?(shardId: number): Promise<StatusUpdate> | StatusUpdate;

  /** Attempt to resume the previous shards session with the gateway. */
  resume(): Promise<void>;

  /** Send a message to Discord.
   * @param {boolean} [highPriority=false] - Whether this message should be send asap.
   */
  send(message: ShardSocketRequest, highPriority?: boolean): Promise<void>;
  /** Shutdown the shard.
   * Forcefully disconnect the shard from Discord.
   * The shard may not attempt to reconnect with Discord.
   */
  shutdown(): Promise<void>;

  /** @private Internal shard bucket.
   * Only access this if you know what you are doing.
   *
   * Bucket for handling shard request rate limits.
   */
  bucket: LeakyBucket;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Handle a gateway connection close.
   */
  handleClose(close: CloseEvent): Promise<void>;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Handle an incoming gateway message.
   */
  handleMessage(message: MessageEvent<any>): Promise<void>;

  /** This function communicates with the management process, in order to know whether its free to identify. */
  requestIdentify(): Promise<void>;

  /** @private Internal state.
   * Only use this if you know what you are doing.
   *
   * Cache for pending gateway requests which should have been send while the gateway went offline.
   */
  offlineSendQueue: ((_?: unknown) => void)[];

  /** @private Internal shard map.
   * Only use this map if you know what you are doing.
   *
   * This is used to resolve internal waiting states.
   * Mapped by SelectedEvents => ResolveFunction
   */
  resolves: Map<"READY" | "RESUMED" | "INVALID_SESSION", (payload: DiscordGatewayPayload) => void>;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Start sending heartbeat payloads to Discord in the provided interval.
   */
  startHeartbeating(interval: number): void;

  /** @private Internal shard function.
   * Only use this function if you know what you are doing.
   *
   * Stop the heartbeating process with discord.
   */
  stopHeartbeating(): void;
}

export enum ShardState {
  /** Shard is fully connected to the gateway and receiving events from Discord. */
  Connected = 0,
  /** Shard started to connect to the gateway.
   * This is only used if the shard is not currently trying to identify or resume.
   */
  Connecting = 1,
  /** Shard got disconnected and reconnection actions have been started. */
  Disconnected = 2,
  /** The shard is connected to the gateway but only heartbeating.
   * At this state the shard has not been identified with discord.
   */
  Unidentified = 3,
  /** Shard is trying to identify with the gateway to create a new session. */
  Identifying = 4,
  /** Shard is trying to resume a session with the gateway. */
  Resuming = 5,
  /** Shard got shut down studied or due to a not (self) fixable error and may not attempt to reconnect on its own. */
  Offline = 6,
}

export interface ShardGatewayConfig {
  /** Whether incoming payloads are compressed using zlib. */
  compress: boolean;
  /** The calculated intent value of the events which the shard should receive. */
  intents: number;
  /** Identify properties to use */
  properties: {
    /** Operating system the shard runs on. */
    $os: string;
    /** The "browser" where this shard is running on. */
    $browser: string;
    /** The device on which the shard is running. */
    $device: string;
  };
  /** Bot token which is used to connect to Discord */
  token: string;
  /** The URL of the gateway which should be connected to. */
  url: string;
  /** The gateway version which should be used. */
  version: number;
}

export interface ShardHeart {
  /** Whether or not the heartbeat was acknowledged by Discord in time. */
  acknowledged: boolean;
  /** Interval between heartbeats requested by Discord. */
  interval: number;
  /** Id of the interval, which is used for sending the heartbeats. */
  intervalId?: number;
  /** Unix (in milliseconds) timestamp when the last heartbeat ACK was received from Discord. */
  lastAck?: number;
  /** Unix timestamp (in milliseconds) when the last heartbeat was sent. */
  lastBeat?: number;
  /** Round trip time (in milliseconds) from Shard to Discord and back.
   * Calculated using the heartbeat system.
   * Note: this value is undefined until the first heartbeat to Discord has happened.
   */
  rtt?: number;
  /** Id of the timeout which is used for sending the first heartbeat to Discord since it's "special". */
  timeoutId?: number;
}

export interface ShardEvents {
  /** A heartbeat has been send. */
  heartbeat?(shard: Shard): unknown;
  /** A heartbeat ACK was received. */
  heartbeatAck?(shard: Shard): unknown;
  /** Shard has received a Hello payload. */
  hello?(shard: Shard): unknown;
  /** The Shards session has been invalidated. */
  invalidSession?(shard: Shard, resumable: boolean): unknown;
  /** The shard has started a resume action. */
  resuming?(shard: Shard): unknown;
  /** The shard has successfully resumed an old session. */
  resumed?(shard: Shard): unknown;
  /** Discord has requested the Shard to reconnect. */
  requestedReconnect?(shard: Shard): unknown;
  /** The shard started to connect to Discord's gateway. */
  connecting?(shard: Shard): unknown;
  /** The shard is connected with Discord's gateway. */
  connected?(shard: Shard): unknown;
  /** The shard has been disconnected from Discord's gateway. */
  disconnected?(shard: Shard): unknown;
  /** The shard has started to identify itself to Discord. */
  identifying?(shard: Shard): unknown;
  /** The shard has successfully been identified itself with Discord. */
  identified?(shard: Shard): unknown;
  /** The shard has received a message from Discord. */
  message?(shard: Shard, payload: DiscordGatewayPayload): unknown;
}

export enum ShardSocketCloseCodes {
  /** A regular Shard shutdown.
   * Discord will display this Shard as offline for other users.
   */
  Shutdown = 1000,
  /** A resume has been requested and therefore the old connection needs to be closed. */
  ResumeClosingOldConnection = 3024,
  /** Did not receive a heartbeat ACK in time.
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
  op: GatewayOpcodes;
  /** Payload data. */
  d: unknown;
}
