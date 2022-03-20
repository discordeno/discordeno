import { Collection } from "../util/collection.ts";
import { safeRequestsPerShard } from "./safeRequestsPerShard.ts";
import { closeWS } from "./closeWs.ts";
import { createShard } from "./createShard.ts";
import { handleOnMessage } from "./handleOnMessage.ts";
import { heartbeat } from "./heartbeat.ts";
import { identify } from "./identify.ts";
import { processGatewayQueue } from "./processGatewayQueue.ts";
import {
  markNewGuildShardId,
  resharder,
  resharderCloseOldShards,
  resharderIsPending,
  reshardingEditGuildShardIds,
  startReshardingChecks,
} from "./resharder.ts";
import { resume } from "./resume.ts";
import { sendShardMessage } from "./sendShardMessage.ts";
import { prepareBuckets, spawnShards } from "./spawnShards.ts";
import { stopGateway } from "./stopGateway.ts";
import { tellWorkerToIdentify } from "./tellWorkerToIdentify.ts";
import { DiscordenoShard } from "./shard.ts";
import { GatewayIntents } from "../types/shared.ts";
import { StatusUpdate } from "../helpers/misc/editBotStatus.ts";
import { DiscordGatewayPayload } from "../types/discord.ts";
import { calculateMaxShards } from "./calculateMaxShards.ts";

/** Create a new Gateway Manager.
 *
 * @param options: Customize every bit of the manager. If something is not
 * provided, it will fallback to a default which should be suitable for most
 * bots.
 */
export function createGatewayManager(
  options: Partial<GatewayManager> & Pick<GatewayManager, "handleDiscordPayload">,
): GatewayManager {
  return {
    queueResetInterval: 60000,
    maxRequestsPerInterval: 120,
    cache: {
      guildIds: new Set(),
      loadingGuildIds: new Set(),
      editedMessages: new Collection(),
    },
    secretKey: options.secretKey ?? "",
    url: options.url ?? "",
    reshard: options.reshard ?? true,
    reshardPercentage: options.reshardPercentage ?? 80,
    spawnShardDelay: options.spawnShardDelay ?? 2600,
    maxShards: options.maxShards ?? options.shardsRecommended ?? 0,
    useOptimalLargeBotSharding: options.useOptimalLargeBotSharding ?? true,
    shardsPerWorker: options.shardsPerWorker ?? 25,
    maxWorkers: options.maxWorkers ?? 4,
    firstShardId: options.firstShardId ?? 0,
    lastShardId: options.lastShardId ?? options.maxShards ?? options.shardsRecommended ?? 1,
    token: options.token ?? "",
    compress: options.compress ?? false,
    $os: options.$os ?? "linux",
    $browser: options.$browser ?? "Discordeno",
    $device: options.$device ?? "Discordeno",
    intents:
      (Array.isArray(options.intents)
        ? options.intents.reduce((bits, next) => (bits |= GatewayIntents[next]), 0)
        : options.intents) ?? 0,
    shard: options.shard ?? [0, options.shardsRecommended ?? 1],
    presence: options.presence,
    urlWSS: options.urlWSS ?? "wss://gateway.discord.gg/?v=9&encoding=json",
    shardsRecommended: options.shardsRecommended ?? 1,
    sessionStartLimitTotal: options.sessionStartLimitTotal ?? 1000,
    sessionStartLimitRemaining: options.sessionStartLimitRemaining ?? 1000,
    sessionStartLimitResetAfter: options.sessionStartLimitResetAfter ?? 0,
    maxConcurrency: options.maxConcurrency ?? 1,
    shards: options.shards ?? new Collection(),
    loadingShards: options.loadingShards ?? new Collection(),
    buckets: new Collection(),
    utf8decoder: new TextDecoder(),

    prepareBuckets: options.prepareBuckets ?? prepareBuckets,
    spawnShards: options.spawnShards ?? spawnShards,
    createShard: options.createShard ?? createShard,
    identify: options.identify ?? identify,
    heartbeat: options.heartbeat ?? heartbeat,
    tellWorkerToIdentify,
    debug: options.debug || function () {},
    resharding: {
      resharder: options.resharding?.resharder ?? resharder,
      isPending: options.resharding?.isPending ?? resharderIsPending,
      closeOldShards: options.resharding?.closeOldShards ?? resharderCloseOldShards,
      check: options.resharding?.check ?? startReshardingChecks,
      markNewGuildShardId: options.resharding?.markNewGuildShardId ?? markNewGuildShardId,
      editGuildShardIds: options.resharding?.editGuildShardIds ?? reshardingEditGuildShardIds,
    },
    handleOnMessage: options.handleOnMessage ?? handleOnMessage,
    processGatewayQueue: options.processGatewayQueue ?? processGatewayQueue,
    closeWS: options.closeWS ?? closeWS,
    stopGateway: options.stopGateway ?? stopGateway,
    sendShardMessage: options.sendShardMessage ?? sendShardMessage,
    resume: options.resume ?? resume,
    safeRequestsPerShard: options.safeRequestsPerShard ?? safeRequestsPerShard,
    handleDiscordPayload: options.handleDiscordPayload,
    calculateMaxShards: options.calculateMaxShards ?? calculateMaxShards,
  };
}

export interface GatewayManager {
  /** The secret key authorization header the bot will expect when sending payloads. */
  secretKey: string;
  /** The url that all discord payloads for the dispatch type should be sent to. */
  url: string;
  /** Whether or not to automatically reshard. */
  reshard: boolean;
  /** The percentage at which resharding should occur. */
  reshardPercentage: number;
  /** The delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 2500. YOU DON"T WANT TO HIT THE RATE LIMIT!!! */
  spawnShardDelay: number;
  /** The maximum shard Id number. Useful for zero-downtime updates or resharding. */
  maxShards: number;
  /** Whether or not the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers. */
  useOptimalLargeBotSharding: boolean;
  /** The amount of shards to load per worker. */
  shardsPerWorker: number;
  /** The maximum amount of workers to use for your bot. */
  maxWorkers: number;
  /** The first shard Id to start spawning. */
  firstShardId: number;
  /** The last shard Id for this worker. */
  lastShardId: number;
  token: string;
  compress: boolean;
  $os: string;
  $browser: string;
  $device: string;
  intents: number | (keyof typeof GatewayIntents)[];
  shard: [number, number];
  presence?: Omit<StatusUpdate, "afk" | "since">;

  /** The WSS URL that can be used for connecting to the gateway. */
  urlWSS: string;
  /** The recommended number of shards to use when connecting. */
  shardsRecommended: number;
  /** The total number of session starts the current user is allowed. */
  sessionStartLimitTotal: number;
  /** The remaining number of session starts the current user is allowed. */
  sessionStartLimitRemaining: number;
  /** Milliseconds left until limit is reset. */
  sessionStartLimitResetAfter: number;
  /** The number of identify requests allowed per 5 seconds.
   * So, if you had a max concurrency of 16, and 16 shards for example, you could start them all up at the same time.
   * Whereas if you had 32 shards, if you tried to start up shard 0 and 16 at the same time for example, it would not work. You can start shards 0-15 concurrently, then 16-31...
   */
  maxConcurrency: number;
  shards: Collection<number, DiscordenoShard>;
  loadingShards: Collection<
    number,
    {
      shardId: number;
      resolve: (value: unknown) => void;
    }
  >;
  /** Stored as bucketId: { workers: [workerId, [ShardIds]], createNextShard: boolean } */
  buckets: Collection<
    number,
    {
      workers: number[][];
      createNextShard: (() => Promise<unknown>)[];
    }
  >;
  utf8decoder: TextDecoder;
  /** The amount of milliseconds the gateway rate limit will reset in. By default 60000 or 1 minute. */
  queueResetInterval: number;
  /** The maximum amount of requests that the gateway can make before being rate limited. By default 120. */
  maxRequestsPerInterval: number;

  cache: {
    guildIds: Set<bigint>;
    loadingGuildIds: Set<bigint>;
    editedMessages: Collection<bigint, string>;
  };

  // METHODS

  /** Prepares the buckets for identifying */
  prepareBuckets: typeof prepareBuckets;
  /** The handler for spawning ALL the shards. */
  spawnShards: typeof spawnShards;
  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard: typeof createShard;
  /** Begins identification of the shard to discord. */
  identify: typeof identify;
  /** Begins heartbeating of the shard to keep it alive. */
  heartbeat: typeof heartbeat;
  /** Sends the discord payload to another server. */
  handleDiscordPayload: (gateway: GatewayManager, data: DiscordGatewayPayload, shardId: number) => any;
  /** Tell the worker to begin identifying this shard  */
  tellWorkerToIdentify: typeof tellWorkerToIdentify;
  /** Handle the different logs. Used for debugging. */
  debug: (text: GatewayDebugEvents, ...args: any[]) => unknown;
  /** The methods related to resharding. */
  resharding: {
    /** Handles resharding the bot when necessary. */
    resharder: typeof resharder;
    /** Handles checking if all new shards are online in the new gateway. */
    isPending: typeof resharderIsPending;
    /** Handles closing all shards in the old gateway. */
    closeOldShards: typeof resharderCloseOldShards;
    /** Handles checking if it is time to reshard and triggers the resharder. */
    check: typeof startReshardingChecks;
    /** Handler to mark a guild id with its new shard id in cache. */
    markNewGuildShardId: typeof markNewGuildShardId;
    /** Handler to update all guilds in cache with the new shard id. */
    editGuildShardIds: typeof reshardingEditGuildShardIds;
  };
  /** Handles the message events from websocket. */
  handleOnMessage: typeof handleOnMessage;
  /** Handles processing queue of requests send to this shard. */
  processGatewayQueue: typeof processGatewayQueue;
  /** Closes shard WebSocket connection properly. */
  closeWS: typeof closeWS;
  /** Use this function to stop the gateway properly. */
  stopGateway: typeof stopGateway;
  /** Properly adds a message to the shards queue. */
  sendShardMessage: typeof sendShardMessage;
  /** Properly resume an old shards session. */
  resume: typeof resume;
  /** Calculates the number of requests in a shard that are safe to be used. */
  safeRequestsPerShard: typeof safeRequestsPerShard;
  /** Calculates the number of shards to use based on the max concurrency */
  calculateMaxShards: typeof calculateMaxShards;
}

export type GatewayDebugEvents =
  | "GW ERROR"
  | "GW CLOSED"
  | "GW CLOSED_RECONNECT"
  | "GW RAW"
  | "GW RECONNECT"
  | "GW INVALID_SESSION"
  | "GW RESUMED"
  | "GW RESUMING"
  | "GW IDENTIFYING"
  | "GW RAW_SEND"
  | "GW MAX REQUESTS"
  | "GW DEBUG"
  | "GW HEARTBEATING"
  | "GW HEARTBEATING_STARTED"
  | "GW HEARTBEATING_DETAILS"
  | "GW HEARTBEATING_CLOSED";
