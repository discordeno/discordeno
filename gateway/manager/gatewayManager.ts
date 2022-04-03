import { GetGatewayBot } from "../../transformers/gatewayBot.ts";
import { DiscordGatewayPayload } from "../../types/discord.ts";
import { OmitFirstFnArg, PickPartial } from "../../types/shared.ts";
import { LeakyBucket } from "../../util/bucket.ts";
import { Collection } from "../../util/collection.ts";
import { CreateShard, createShard } from "../shard/createShard.ts";
import { Shard } from "../shard/types.ts";
import { calculateMaxShards } from "./calculateMaxShards.ts";
import { calculateWorkerId } from "./calculateWorkerId.ts";
import {
  markNewGuildShardId,
  resharder,
  resharderCloseOldShards,
  resharderIsPending,
  reshardingEditGuildShardIds,
  startReshardingChecks,
} from "./resharder.ts";
import { prepareBuckets, spawnShards } from "./spawnShards.ts";
import { tellWorkerToIdentify } from "./tellWorkerToIdentify.ts";

export type GatewayManager = ReturnType<typeof createGatewayManager>;

/** Create a new Gateway Manager.
 *
 * @param options: Customize every bit of the manager. If something is not
 * provided, it will fallback to a default which should be suitable for most
 * bots.
 */
export function createGatewayManager(
  options: PickPartial<CreateGatewayManager, "handleDiscordPayload" | "gatewayBot">,
) {
  return {
    // SHARDING DATA

    spawnShardDelay: options.spawnShardDelay ?? 5100,
    totalShards: options.totalShards ?? options.gatewayBot.shards ?? 1,
    firstShardId: options.firstShardId ?? 0,
    lastShardId: options.lastShardId ?? (options.totalShards ?? options.gatewayBot.shards) - 1 ?? 1,
    shards: options.shards ?? new Collection<number, Shard>(),

    gatewayBot: options.gatewayBot,

    createShardOptions: options.createShardOptions,

    shardsPerWorker: options.shardsPerWorker ?? 25,
    totalWorkers: options.totalWorkers ?? 4,
    buckets: new Collection<
      number,
      {
        workers: { id: number; queue: number[] }[];
        leak: LeakyBucket;
      }
    >(),

    prepareBuckets: options.prepareBuckets ?? prepareBuckets,
    spawnShards: options.spawnShards ?? spawnShards,
    createShard: options.createShard ?? createShard,
    tellWorkerToIdentify,
    debug: options.debug || function () {},
    resharding: {
      useOptimalLargeBotSharding: options.resharding?.useOptimalLargeBotSharding ?? true,
      reshard: options.resharding?.reshard ?? true,
      reshardPercentage: options.resharding?.reshardPercentage ?? 80,
      resharder: options.resharding?.resharder ?? resharder,
      isPending: options.resharding?.isPending ?? resharderIsPending,
      closeOldShards: options.resharding?.closeOldShards ?? resharderCloseOldShards,
      check: options.resharding?.check ?? startReshardingChecks,
      markNewGuildShardId: options.resharding?.markNewGuildShardId ?? markNewGuildShardId,
      editGuildShardIds: options.resharding?.editGuildShardIds ?? reshardingEditGuildShardIds,
    },

    handleDiscordPayload: options.handleDiscordPayload,
    calculateMaxShards: options.calculateMaxShards ?? calculateMaxShards,

    calculateWorkerId: function (shardId: number) {
      return options.calculateWorkerId?.(this, shardId) ?? calculateWorkerId(this, shardId);
    },
  };
}

export interface CreateGatewayManager {
  /** Delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 5100. YOU DON'T WANT TO HIT THE RATE LIMIT!!! */
  spawnShardDelay: number;
  /** Total amount of shards your bot uses. Useful for zero-downtime updates or resharding. */
  totalShards: number;
  /** The amount of shards to load per worker. */
  shardsPerWorker: number;
  /** The total amount of workers to use for your bot. */
  totalWorkers: number;
  /** Id of the first Shard assigned to this manager. */
  firstShardId: number;
  /** Id of the last Shard assigned to this manager. */
  lastShardId: number;

  /** Important data which is used by the manager to connect shards to the gateway. */
  gatewayBot: GetGatewayBot;

  /** Options which are used to create a new shard. */
  createShardOptions?: Omit<CreateShard, "id" | "totalShards" | "requestIdentify" | "gatewayConfig">;

  shards: Collection<number, Shard>;

  /** Stored as bucketId: { workers: [workerId, [ShardIds]], createNextShard: boolean } */
  buckets: Collection<
    number,
    {
      workers: { id: number; queue: number[] }[];
      leak: LeakyBucket;
    }
  >;
  // METHODS

  /** Prepares the buckets for identifying */
  prepareBuckets: typeof prepareBuckets;
  /** The handler for spawning ALL the shards. */
  spawnShards: typeof spawnShards;
  /** Create the websocket and adds the proper handlers to the websocket. */
  createShard: typeof createShard;
  /** Sends the discord payload to another server. */
  handleDiscordPayload: (gateway: GatewayManager, data: DiscordGatewayPayload, shardId: number) => any;
  /** Tell the worker to begin identifying this shard  */
  tellWorkerToIdentify: typeof tellWorkerToIdentify;
  /** Handle the different logs. Used for debugging. */
  debug: (text: GatewayDebugEvents, ...args: any[]) => unknown;
  /** The methods related to resharding. */
  resharding: {
    /** Whether the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers. */
    useOptimalLargeBotSharding: boolean;
    /** Whether or not to automatically reshard. */
    reshard: boolean;
    /** The percentage at which resharding should occur. */
    reshardPercentage: number;
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
  /** Calculates the number of shards to use based on the max concurrency */
  calculateMaxShards: typeof calculateMaxShards;

  /** Calculate the id of the worker related ot this Shard. */
  calculateWorkerId: typeof calculateWorkerId;
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
