import { DiscordGatewayPayload } from "../../types/discord.ts";
import { GatewayBot, PickPartial } from "../../types/shared.ts";
import { LeakyBucket } from "../../util/bucket.ts";
import { CreateShard, createShard } from "../shard/createShard.ts";
import { Shard, ShardGatewayConfig } from "../shard/types.ts";
import { calculateTotalShards } from "./calculateTotalShards.ts";
import { calculateWorkerId } from "./calculateWorkerId.ts";
// import {
// markNewGuildShardId,
// resharder,
// resharderCloseOldShards,
// resharderIsPending,
// reshardingEditGuildShardIds,
// } from "./resharder.ts";
import { spawnShards } from "./spawnShards.ts";
import { prepareBuckets } from "./prepareBuckets.ts";
import { tellWorkerToIdentify } from "./tellWorkerToIdentify.ts";
import { createShardManager, ShardManager } from "./shardManager.ts";
import { stop } from "./stop.ts";

export type GatewayManager = ReturnType<typeof createGatewayManager>;

/** Create a new Gateway Manager.
 *
 * @param options: Customize every bit of the manager. If something is not
 * provided, it will fallback to a default which should be suitable for most
 * bots.
 */
export function createGatewayManager(
  options: PickPartial<CreateGatewayManager, "handleDiscordPayload" | "gatewayBot" | "gatewayConfig">,
) {
  const prepareBucketsOverwritten = options.prepareBuckets ?? prepareBuckets;
  const spawnShardsOverwritten = options.spawnShards ?? spawnShards;
  const stopOverwritten = options.stop ?? stop;
  const tellWorkerToIdentifyOverwritten = options.tellWorkerToIdentify ?? tellWorkerToIdentify;
  const calculateTotalShardsOverwritten = options.calculateTotalShards ?? calculateTotalShards;
  const calculateWorkerIdOverwritten = options.calculateWorkerId ?? calculateWorkerId;

  const totalShards = options.totalShards ?? options.gatewayBot.shards ?? 1;

  const gatewayManager = {
    // ----------
    // PROPERTIES
    // ----------

    /** The max concurrency buckets.
     * Those will be created when the `spawnShards` (which calls `prepareBuckets` under the hood) function gets called.
     */
    buckets: new Map<
      number,
      {
        workers: { id: number; queue: number[] }[];
        leak: LeakyBucket;
      }
    >(),
    /** Id of the first Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    firstShardId: options.firstShardId ?? 0,
    /** Important data which is used by the manager to connect shards to the gateway. */
    gatewayBot: options.gatewayBot,
    /** Id of the last Shard which should get controlled by this manager.
     *
     * NOTE: This is intended for testing purposes
     * if big bots want to test the gateway on smaller scale.
     * This is not recommended to be used in production.
     */
    lastShardId: options.lastShardId ?? totalShards - 1 ?? 1,
    /** This is where the Shards get stored.
     * This will not be used when having a custom workers solution.
     */
    manager: {} as ShardManager,
    /** Delay in milliseconds to wait before spawning next shard.
     * OPTIMAL IS ABOVE 5100. YOU DON'T WANT TO HIT THE RATE LIMIT!!!
     */
    spawnShardDelay: options.spawnShardDelay ?? 5300,
    /** How many Shards should get assigned to a Worker.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     *
     * NOTE: The last Worker will IGNORE this value,
     * which means that the last worker can get assigned an unlimited amount of shards.
     * This is not a bug but intended behavior and means you have to assign more workers to this manager.
     */
    shardsPerWorker: options.shardsPerWorker ?? 25,
    /** The total amount of Workers which get controlled by this manager.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     */
    totalWorkers: options.totalWorkers ?? 4,

    // ----------
    // PROPERTIES
    // ----------
    /** Prepares the buckets for identifying.
     *
     * NOTE: Most of the time this function does not need to be called,
     * since it gets called by the `spawnShards` function indirectly.
     */
    prepareBuckets: function () {
      return prepareBucketsOverwritten(this);
    },
    /** This function starts to spawn the Shards assigned to this manager.
     *
     * The managers `buckets` will be created and
     *
     * if `resharding.useOptimalLargeBotSharding` is set to true,
     * `totalShards` gets double checked and adjusted accordingly if wrong.
     */
    spawnShards: function () {
      return spawnShardsOverwritten(this);
    },
    /** Stop the gateway. This closes all shards. */
    stop: function (code: number, reason: string) {
      return stopOverwritten(this, code, reason);
    },
    /** Tell the Worker with this Id to identify this Shard.
     *
     * Useful if a custom Worker solution should be used.
     *
     * IMPORTANT: Discordeno will NOT spawn Workers for you.
     * Instead you have to overwrite the `tellWorkerToIdentify` function to make that for you.
     * Look at the [BigBot template gateway solution](https://github.com/discordeno/discordeno/tree/main/template/bigbot/src/gateway) for reference.
     */
    tellWorkerToIdentify: function (workerId: number, shardId: number, bucketId: number) {
      return tellWorkerToIdentifyOverwritten(this, workerId, shardId, bucketId);
    },
    // TODO: fix debug
    /** Handle the different logs. Used for debugging. */
    debug: options.debug || function () {},

    // /** The methods related to resharding. */
    // resharding: {
    //   /** Whether the resharder should automatically switch to LARGE BOT SHARDING when the bot is above 100K servers. */
    //   useOptimalLargeBotSharding: options.resharding?.useOptimalLargeBotSharding ?? true,
    //   /** Whether or not to automatically reshard.
    //    *
    //    * @default true
    //    */
    //   reshard: options.resharding?.reshard ?? true,
    //   /** The percentage at which resharding should occur.
    //    *
    //    * @default 80
    //    */
    //   reshardPercentage: options.resharding?.reshardPercentage ?? 80,
    //   /** Handles resharding the bot when necessary. */
    //   resharder: options.resharding?.resharder ?? resharder,
    //   /** Handles checking if all new shards are online in the new gateway. */
    //   isPending: options.resharding?.isPending ?? resharderIsPending,
    //   /** Handles closing all shards in the old gateway. */
    //   closeOldShards: options.resharding?.closeOldShards ?? resharderCloseOldShards,
    //   /** Handles checking if it is time to reshard and triggers the resharder. */
    //   check: options.resharding?.check ?? startReshardingChecks,
    //   /** Handler to mark a guild id with its new shard id in cache. */
    //   markNewGuildShardId: options.resharding?.markNewGuildShardId ?? markNewGuildShardId,
    //   /** Handler to update all guilds in cache with the new shard id. */
    //   editGuildShardIds: options.resharding?.editGuildShardIds ?? reshardingEditGuildShardIds,
    // },

    /** Calculate the amount of Shards which should be used based on the bot's max concurrency. */
    calculateTotalShards: function () {
      return calculateTotalShardsOverwritten(this);
    },

    /** Calculate the Id of the Worker related to this Shard. */
    calculateWorkerId: function (shardId: number) {
      return calculateWorkerIdOverwritten(this, shardId);
    },
  };

  gatewayManager.manager = createShardManager({
    createShardOptions: options.createShardOptions,
    gatewayConfig: options.gatewayConfig,
    shardIds: [],
    totalShards,

    handleMessage: function (shard, message) {
      return options.handleDiscordPayload(shard, message);
    },

    requestIdentify: async (shardId) => {
      // TODO: improve
      await gatewayManager.buckets.get(shardId % gatewayManager.gatewayBot.sessionStartLimit.maxConcurrency)!.leak
        .acquire(1);
    },
  });

  return gatewayManager;
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
  /** Id of the first Shard which should get controlled by this manager.
   *
   * NOTE: This is intended for testing purposes
   * if big bots want to test the gateway on smaller scale.
   * This is not recommended to be used in production.
   */
  firstShardId: number;
  /** Id of the last Shard which should get controlled by this manager.
   *
   * NOTE: This is intended for testing purposes
   * if big bots want to test the gateway on smaller scale.
   * This is not recommended to be used in production.
   */
  lastShardId: number;

  /** Important data which is used by the manager to connect shards to the gateway. */
  gatewayBot: GatewayBot;

  gatewayConfig: PickPartial<ShardGatewayConfig, "token">;

  /** Options which are used to create a new shard. */
  createShardOptions?: Omit<CreateShard, "id" | "totalShards" | "requestIdentify" | "gatewayConfig">;

  /** Stored as bucketId: { workers: [workerId, [ShardIds]], createNextShard: boolean } */
  buckets: Map<
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
  /** The handler to close all shards. */
  stop: typeof stop;
  /** Sends the discord payload to another server. */
  handleDiscordPayload: (shard: Shard, data: DiscordGatewayPayload) => any;
  /** Tell the worker to begin identifying this shard  */
  tellWorkerToIdentify: typeof tellWorkerToIdentify;
  /** Handle the different logs. Used for debugging. */
  debug: (text: GatewayDebugEvents, ...args: any[]) => unknown;
  /** The methods related to resharding. */
  // resharding: {
  //   /** Whether the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers. */
  //   useOptimalLargeBotSharding: boolean;
  //   /** Whether or not to automatically reshard. */
  //   reshard: boolean;
  //   /** The percentage at which resharding should occur. */
  //   reshardPercentage: number;
  //   /** Handles resharding the bot when necessary. */
  //   resharder: typeof resharder;
  //   /** Handles checking if all new shards are online in the new gateway. */
  //   isPending: typeof resharderIsPending;
  //   /** Handles closing all shards in the old gateway. */
  //   closeOldShards: typeof resharderCloseOldShards;
  //   /** Handler to mark a guild id with its new shard id in cache. */
  //   markNewGuildShardId: typeof markNewGuildShardId;
  //   /** Handler to update all guilds in cache with the new shard id. */
  //   editGuildShardIds: typeof reshardingEditGuildShardIds;
  // };
  /** Calculates the number of shards to use based on the max concurrency */
  calculateTotalShards: typeof calculateTotalShards;

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
