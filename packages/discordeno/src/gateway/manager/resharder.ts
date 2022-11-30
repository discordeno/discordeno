import { GetGatewayBot } from "../../transformers/gatewayBot.ts";
import { DiscordGatewayPayload, DiscordReady } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";
import { createShard } from "../shard/createShard.ts";
import { decompressWith } from "../shard/deps.ts";
import { handleMessage } from "../shard/handleMessage.ts";
import { Shard, ShardSocketCloseCodes } from "../shard/types.ts";
import { GatewayManager } from "./gatewayManager.ts";

export type Resharder = ReturnType<typeof activateResharder>;

export function activateResharder(options: ActivateResharderOptions) {
  const resharder = {
    // ----------
    // PROPERTIES
    // ----------

    /** Interval in milliseconds of when to check whether it's time to reshard.
     *
     * @default 28800000 (8 hours)
     */
    checkInterval: options.checkInterval || 28800000,

    /** Gateway manager which is currently processing all shards and events. */
    gateway: options.gatewayManager,

    /** Timeout of the reshard checker. */
    intervalId: undefined as number | undefined,

    /** Percentage at which resharding should occur.
     * @default 80
     */
    percentage: options.percentage ?? 80,

    /** Whether the resharder should automatically switch to LARGE BOT SHARDING when the bot is above 100K servers. */
    useOptimalLargeBotSharding: options.useOptimalLargeBotSharding ?? true,

    /** The collection of shards that were created and identified by this resharder but are ignoring incoming events because all shards are not yet online. */
    pendingShards: new Collection<number, Shard>(),

    // ----------
    // METHODS
    // ----------

    /** Activate the resharder and delay the next reshard check. */
    activate: function () {
      return activate(this);
    },

    /** Function which is used to fetch the current gateway information of the bot.
     * This function is mainly used by the reshard checker.
     */
    getGatewayBot: options.getGatewayBot,

    /** Reshard the bots gateway. */
    reshard: function (gatewayBot: GetGatewayBot) {
      return reshard(this, gatewayBot);
    },

    tellWorkerToPrepare: options.tellWorkerToPrepare,

    shardIsPending: options.shardIsPending ?? shardIsPending,

    markNewGuildShardId: options.markNewGuildShardId ?? markNewGuildShardId,
  };

  resharder.activate();

  return resharder;
}

export interface ActivateResharderOptions {
  /** Interval in milliseconds of when to check whether it's time to reshard.
   *
   * @default 28800000 (8 hours)
   */
  checkInterval?: number;
  /** Gateway manager which the resharder should be bound to. */
  gatewayManager: GatewayManager;
  /** Percentage at which resharding should occur.
   * @default 80
   */
  percentage?: number;
  /** Whether the resharder should automatically switch to LARGE BOT SHARDING when the bot is above 100K servers. */
  useOptimalLargeBotSharding?: boolean;

  /** Function which can be used to fetch the current gateway information of the bot.
   * This function is mainly used by the reshard checker.
   */
  getGatewayBot(): Promise<GetGatewayBot>;

  /** Function which is used to tell a Worker that it should identify a resharder Shard to the gateway and wait for further instructions.
   * The worker should **NOT** process any events coming from this Shard.
   */
  tellWorkerToPrepare(
    gatewayManager: GatewayManager,
    workerId: number,
    shardId: number,
    bucketId: number,
  ): Promise<void>;

  /** Tell the resharder and manager that the a shard is created and identified using new settings but is currently pending by ignoring incoming events. This can be used to track all shards are online which is when old shards are closed and these new shards replace the old ones. */
  shardIsPending(resharder: Resharder, shard: Shard): Promise<void>;

  /** Used to update the shard ids of the cached guilds. When a bot is resharded, guilds can be moved around across shards to evenly distribute, so the shards need to be updated. */
  markNewGuildShardId(guildIds: string[], shardId: number): Promise<void>;
}

/** Handler that by default will check to see if resharding should occur. Can be overridden if you have multiple servers and you want to communicate through redis pubsub or whatever you prefer. */
export function activate(resharder: Resharder): void {
  if (resharder.intervalId !== undefined) {
    throw new Error("[RESHARDER] Cannot activate the resharder more than one time.");
  }

  resharder.intervalId = setInterval(async () => {
    console.log("[Resharding] Checking if resharding is needed.");

    const result = await resharder.getGatewayBot();

    // 2500 is the max amount of guilds a single shard can handle
    // 1000 is the amount of guilds discord uses to determine how many shards to recommend.
    // This algo helps check if your bot has grown enough to reshard.
    const percentage = (2500 * result.shards) /
      (resharder.gateway.manager.totalShards * 1000) * 100;
    // Less than necessary% being used so do nothing
    if (percentage < resharder.percentage) return;

    // Don't have enough identify rate limits to reshard
    if (result.sessionStartLimit.remaining < result.shards) return;

    // MULTI-SERVER BOTS OVERRIDE THIS IF YOU NEED TO RESHARD SERVER BY SERVER
    return resharder.reshard(result);
  }, resharder.checkInterval);
}

export async function reshard(resharder: Resharder, gatewayBot: GetGatewayBot) {
  console.log("[Resharding] Starting the reshard process.");

  resharder.gateway.gatewayBot = gatewayBot;

  // If more than 100K servers, begin switching to 16x sharding
  if (resharder.useOptimalLargeBotSharding) {
    console.log("[Resharding] Using optimal large bot sharding solution.");
    resharder.gateway.manager.totalShards = resharder.gateway.calculateTotalShards();
  }

  resharder.gateway.prepareBuckets();

  // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
  resharder.gateway.buckets.forEach(async (bucket, bucketId) => {
    for (const worker of bucket.workers) {
      for (const shardId of worker.queue) {
        await resharder.tellWorkerToPrepare(resharder.gateway, worker.id, shardId, bucketId);
      }
    }
  });
}

/** Handler that by default will save the new shard id for each guild this becomes ready in new gateway. This can be overridden to save the shard ids in a redis cache layer or whatever you prefer. These ids will be used later to update all guilds. */
export async function markNewGuildShardId(guildIds: bigint[], shardId: number) {
  // PLACEHOLDER TO LET YOU MARK A GUILD ID AND SHARD ID FOR LATER USE ONCE RESHARDED
}

/** Handler that by default does not do anything since by default the library will not cache. */
export async function reshardingEditGuildShardIds() {
  // PLACEHOLDER TO LET YOU UPDATE CACHED GUILDS
}

export async function tellWorkerToPrepare(resharder: Resharder, shardId: number) {
  // First create a shard without identifyin.
  const shard = createShard({
    ...resharder.gateway.manager.createShardOptions,
    id: shardId,
    totalShards: resharder.gateway.manager.totalShards,
    gatewayConfig: resharder.gateway.manager.gatewayConfig,
    requestIdentify: async function () {
      return await resharder.gateway.manager.requestIdentify(shardId);
    },
    // Ignore events in this new shard for now
    handleMessage: async function (shard, message) {
      message = message.data;

      // If message compression is enabled,
      // Discord might send zlib compressed payloads.
      if (shard.gatewayConfig.compress && message instanceof Blob) {
        message = decompressWith(
          new Uint8Array(await message.arrayBuffer()),
          0,
          (slice: Uint8Array) => new TextDecoder().decode(slice),
        );
      }

      // Safeguard incase decompression failed to make a string.
      if (typeof message !== "string") return;

      const messageData = JSON.parse(message) as DiscordGatewayPayload;

      if (messageData.t === "READY") {
        const payload = messageData.d as DiscordReady;
        shard.resumeGatewayUrl = payload.resume_gateway_url;
        await resharder.markNewGuildShardId(payload.guilds.map((g) => g.id), shardId);
      }
    },
  });

  // Now identify this shard(still ignoring events)
  await shard.identify();

  // Tell the manager that this shard is online
  resharder.shardIsPending(resharder, shard);
}

export async function shardIsPending(resharder: Resharder, shard: Shard) {
  // Save this in pending at the moment, until all shards are online
  resharder.pendingShards.set(shard.id, shard);

  // Check if all shards are now online.
  if (resharder.gateway.gatewayBot.shards <= resharder.pendingShards.size) {
    // Time to replace old shards

    // New shards start processing events
    for (const shard of resharder.pendingShards.values()) {
      shard.handleMessage = async function (message) {
        return await handleMessage(shard, message);
      };
    }

    // Old shards stop processing events
    for (const shard of resharder.gateway.manager.shards.values()) {
      const oldHandler = shard.handleMessage;

      shard.handleMessage = async function (message) {
        // Member checks need to continue but others can stop
        if (message.data.t !== "GUILD_MEMBERS_CHUNK") return;
        // Process only the chunking events
        oldHandler(message);
      };
    }

    // Close old shards
    await resharder.gateway.stop(ShardSocketCloseCodes.Resharded, "Resharded!");

    // Replace old shards
    resharder.gateway.manager.shards = resharder.pendingShards;
  }
}
