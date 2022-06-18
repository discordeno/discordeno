import { DiscordGatewayPayload } from "../../types/discord.ts";
import { GatewayOpcodes } from "../../types/shared.ts";
import { createShard } from "./createShard.ts";

// TODO: think whether we also need an identifiedShard function

export const MAX_GATEWAY_REQUESTS_PER_INTERVAL = 120;
export const GATEWAY_RATE_LIMIT_RESET_INTERVAL = 60_000; // 60 seconds
export const DEFAULT_HEARTBEAT_INTERVAL = 45000;

export type Shard = ReturnType<typeof createShard>;

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
  /** Whether incoming payloads are compressed using zlib.
   *
   * @default false
   */
  compress: boolean;
  /** The calculated intent value of the events which the shard should receive.
   *
   * @default 0
   */
  intents: number;
  /** Identify properties to use */
  properties: {
    /** Operating system the shard runs on.
     *
     * @default "darwin" | "linux" | "windows"
     */
    os: string;
    /** The "browser" where this shard is running on.
     *
     * @default "Discordeno"
     */
    browser: string;
    /** The device on which the shard is running.
     *
     * @default "Discordeno"
     */
    device: string;
  };
  /** Bot token which is used to connect to Discord */
  token: string;
  /** The URL of the gateway which should be connected to.
   *
   * @default "wss://gateway.discord.gg"
   */
  url: string;
  /** The gateway version which should be used.
   *
   * @default 10
   */
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
  /** A regular Shard shutdown. */
  Shutdown = 3000,
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
