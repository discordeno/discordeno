import { GatewayBot } from "../../types/shared.ts";
import { createGatewayManager, GatewayManager } from "./gatewayManager.ts";

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
    reshard: function (gatewayBot: GatewayBot) {
      return reshard(this, gatewayBot);
    },

    tellWorkerToPrepare: options.tellWorkerToPrepare,
  };

  resharder.activate();

  return resharder;
}

//    /** The methods related to resharding. */
//    resharding: {
//      /** Whether the resharder should automatically switch to LARGE BOT SHARDING when the bot is above 100K servers. */
//      useOptimalLargeBotSharding: options.resharding?.useOptimalLargeBotSharding ?? true,
//      /** Whether or not to automatically reshard.
//       *
//       * @default true
//       */
//      reshard: options.resharding?.reshard ?? true,
//      /** The percentage at which resharding should occur.
//       *
//       * @default 80
//       */
//      reshardPercentage: options.resharding?.reshardPercentage ?? 80,
//      /** Handles resharding the bot when necessary. */
//      resharder: options.resharding?.resharder ?? resharder,
//      /** Handles checking if all new shards are online in the new gateway. */
//      isPending: options.resharding?.isPending ?? resharderIsPending,
//      /** Handles closing all shards in the old gateway. */
//      closeOldShards: options.resharding?.closeOldShards ?? resharderCloseOldShards,
//      /** Handles checking if it is time to reshard and triggers the resharder. */
//      check: options.resharding?.check ?? startReshardingChecks,
//      /** Handler to mark a guild id with its new shard id in cache. */
//      markNewGuildShardId: options.resharding?.markNewGuildShardId ?? markNewGuildShardId,
//      /** Handler to update all guilds in cache with the new shard id. */
//      editGuildShardIds: options.resharding?.editGuildShardIds ?? reshardingEditGuildShardIds,
//    },

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
  getGatewayBot(): Promise<GatewayBot>;

  /** Function which is used to tell a Worker that it should identify a resharder Shard to the gateway and wait for further instructions.
   * The worker should **NOT** process any events coming from this Shard.
   */
  tellWorkerToPrepare(
    gatewayManager: GatewayManager,
    workerId: number,
    shardId: number,
    bucketId: number,
  ): Promise<void>;
}

/** Handler that by default will check to see if resharding should occur. Can be overridden if you have multiple servers and you want to communicate through redis pubsub or whatever you prefer. */
export function activate(resharder: Resharder): void {
  if (resharder.intervalId !== undefined) {
    throw new Error("[RESHARDER] Cannot activate the resharder more than one time.");
  }

  resharder.intervalId = setInterval(async () => {
    // gateway.debug("GW DEBUG", "[Resharding] Checking if resharding is needed.");

    // TODO: is it possible to route this to REST?
    const result = await resharder.getGatewayBot();

    const percentage =
      ((result.shards - resharder.gateway.manager.totalShards) / resharder.gateway.manager.totalShards) * 100;
    // Less than necessary% being used so do nothing
    if (percentage < resharder.percentage) return;

    // Don't have enough identify rate limits to reshard
    if (result.sessionStartLimit.remaining < result.shards) return;

    // MULTI-SERVER BOTS OVERRIDE THIS IF YOU NEED TO RESHARD SERVER BY SERVER
    return resharder.reshard(result);
  }, resharder.checkInterval);
}

export async function reshard(resharder: Resharder, gatewayBot: GatewayBot) {
  // oldGateway.debug("GW DEBUG", "[Resharding] Starting the reshard process.");

  // Create a temporary gateway manager for easier handling.
  const tmpManager = createGatewayManager({
    gatewayBot: gatewayBot,
    gatewayConfig: resharder.gateway.manager.gatewayConfig,
    handleDiscordPayload: () => {},
    tellWorkerToIdentify: resharder.tellWorkerToPrepare,
  });

  // Begin resharding

  // If more than 100K servers, begin switching to 16x sharding
  if (resharder.useOptimalLargeBotSharding) {
    // gateway.debug("GW DEBUG", "[Resharding] Using optimal large bot sharding solution.");
    tmpManager.manager.totalShards = resharder.gateway.calculateTotalShards(resharder.gateway);
  }

  tmpManager.spawnShards(tmpManager);

  return new Promise((resolve) => {
    // TIMER TO KEEP CHECKING WHEN ALL SHARDS HAVE RESHARDED
    const timer = setInterval(async () => {
      const pending = await gateway.resharding.isPending(gateway, oldGateway);
      // STILL PENDING ON SOME SHARDS TO BE CREATED
      if (pending) return;

      // ENABLE EVENTS ON NEW SHARDS AND IGNORE EVENTS ON OLD
      const oldHandler = oldGateway.handleDiscordPayload;
      gateway.handleDiscordPayload = oldHandler;
      oldGateway.handleDiscordPayload = function (og, data, shardId) {
        // ALLOW EXCEPTION FOR CHUNKING TO PREVENT REQUESTS FREEZING
        if (data.t !== "GUILD_MEMBERS_CHUNK") return;
        oldHandler(og, data, shardId);
      };

      // STOP TIMER
      clearInterval(timer);
      await gateway.resharding.editGuildShardIds();
      await gateway.resharding.closeOldShards(oldGateway);
      gateway.debug("GW DEBUG", "[Resharding] Complete.");
      resolve(gateway);
    }, 30000);
  }) as Promise<GatewayManager>;
}

// /** The handler to automatically reshard when necessary. */
// export async function resharder(
//   oldGateway: GatewayManager,
//   results: GatewayBot,
// ) {
//   oldGateway.debug("GW DEBUG", "[Resharding] Starting the reshard process.");

//   const gateway = createGatewayManager({
//     ...oldGateway,
//     // RESET THE SETS AND COLLECTIONS
//     // cache: {
//     //   guildIds: new Set(),
//     //   loadingGuildIds: new Set(),
//     //   editedMessages: new Collection(),
//     // },
//     shards: new Collection(),
//     // loadingShards: new Collection(),
//     buckets: new Collection(),
//     // utf8decoder: new TextDecoder(),
//   });

//   for (const [key, value] of Object.entries(oldGateway)) {
//     if (key === "handleDiscordPayload") {
//       gateway.handleDiscordPayload = async function (_, data, shardId) {
//         if (data.t === "READY") {
//           const payload = data.d as DiscordReady;
//           await gateway.resharding.markNewGuildShardId(payload.guilds.map((g) => BigInt(g.id)), shardId);
//         }
//       };
//       continue;
//     }

//     // USE ANY CUSTOMIZED OPTIONS FROM OLD GATEWAY
//     // @ts-ignore TODO: fix this dynamical assignment
//     gateway[key] = oldGateway[key as keyof typeof oldGateway];
//   }

//   // Begin resharding
//   gateway.maxShards = results.shards;
//   // FOR MANUAL SHARD CONTROL, OVERRIDE THIS SHARD ID!
//   gateway.lastShardId = oldGateway.lastShardId === oldGateway.maxShards ? gateway.maxShards : oldGateway.lastShardId;
//   gateway.shardsRecommended = results.shards;
//   gateway.sessionStartLimitTotal = results.sessionStartLimit.total;
//   gateway.sessionStartLimitRemaining = results.sessionStartLimit.remaining;
//   gateway.sessionStartLimitResetAfter = results.sessionStartLimit.resetAfter;
//   gateway.maxConcurrency = results.sessionStartLimit.maxConcurrency;
//   // If more than 100K servers, begin switching to 16x sharding
//   if (gateway.useOptimalLargeBotSharding) {
//     gateway.debug("GW DEBUG", "[Resharding] Using optimal large bot sharding solution.");
//     gateway.maxShards = gateway.calculateTotalShards(gateway.maxShards, results.sessionStartLimit.maxConcurrency);
//   }

//   gateway.spawnShards(gateway, gateway.firstShardId);

//   return new Promise((resolve) => {
//     // TIMER TO KEEP CHECKING WHEN ALL SHARDS HAVE RESHARDED
//     const timer = setInterval(async () => {
//       const pending = await gateway.resharding.isPending(gateway, oldGateway);
//       // STILL PENDING ON SOME SHARDS TO BE CREATED
//       if (pending) return;

//       // ENABLE EVENTS ON NEW SHARDS AND IGNORE EVENTS ON OLD
//       const oldHandler = oldGateway.handleDiscordPayload;
//       gateway.handleDiscordPayload = oldHandler;
//       oldGateway.handleDiscordPayload = function (og, data, shardId) {
//         // ALLOW EXCEPTION FOR CHUNKING TO PREVENT REQUESTS FREEZING
//         if (data.t !== "GUILD_MEMBERS_CHUNK") return;
//         oldHandler(og, data, shardId);
//       };

//       // STOP TIMER
//       clearInterval(timer);
//       await gateway.resharding.editGuildShardIds();
//       await gateway.resharding.closeOldShards(oldGateway);
//       gateway.debug("GW DEBUG", "[Resharding] Complete.");
//       resolve(gateway);
//     }, 30000);
//   }) as Promise<GatewayManager>;
// }

/** Handler that by default will check all new shards are online in the new gateway. The handler can be overridden if you have multiple servers to communicate through redis pubsub or whatever you prefer. */
export async function resharderIsPending(
  gateway: GatewayManager,
  oldGateway: GatewayManager,
) {
  for (let i = gateway.firstShardId; i < gateway.lastShardId; i++) {
    const shard = gateway.shards.get(i);
    if (!shard?.ready) {
      return true;
    }
  }

  return false;
}

/** Handler that by default closes all shards in the old gateway. Can be overridden if you have multiple servers and you want to communicate through redis pubsub or whatever you prefer. */
export async function resharderCloseOldShards(oldGateway: GatewayManager) {
  // SHUT DOWN ALL SHARDS IF NOTHING IN QUEUE
  oldGateway.shards.forEach((shard) => {
    // CLOSE THIS SHARD IT HAS NO QUEUE
    if (!shard.processingQueue && !shard.queue.length) {
      return oldGateway.closeWS(
        shard.ws,
        3066,
        "Shard has been resharded. Closing shard since it has no queue.",
      );
    }

    // IF QUEUE EXISTS GIVE IT 5 MINUTES TO COMPLETE
    setTimeout(() => {
      oldGateway.closeWS(
        shard.ws,
        3066,
        "Shard has been resharded. Delayed closing shard since it had a queue.",
      );
    }, 300000);
  });
}

// /** Handler that by default will check to see if resharding should occur. Can be overridden if you have multiple servers and you want to communicate through redis pubsub or whatever you prefer. */
// export async function startReshardingChecks(gateway: GatewayManager) {
//   gateway.debug("GW DEBUG", "[Resharding] Checking if resharding is needed.");
//
//   // TODO: is it possible to route this to REST?
//   const results = (await fetch(`https://discord.com/api/gateway/bot`, {
//     headers: {
//       Authorization: `Bot ${gateway.token}`,
//     },
//   }).then((res) => res.json()).then((res) => transformGatewayBot(res))) as GatewayBot;
//
//   const percentage = ((results.shards - gateway.maxShards) / gateway.maxShards) * 100;
//   // Less than necessary% being used so do nothing
//   if (percentage < gateway.reshardPercentage) return;
//
//   // Don't have enough identify rate limits to reshard
//   if (results.sessionStartLimit.remaining < results.shards) return;
//
//   // MULTI-SERVER BOTS OVERRIDE THIS IF YOU NEED TO RESHARD SERVER BY SERVER
//   return gateway.resharding.resharder(gateway, results);
// }

/** Handler that by default will save the new shard id for each guild this becomes ready in new gateway. This can be overridden to save the shard ids in a redis cache layer or whatever you prefer. These ids will be used later to update all guilds. */
export async function markNewGuildShardId(guildIds: bigint[], shardId: number) {
  // PLACEHOLDER TO LET YOU MARK A GUILD ID AND SHARD ID FOR LATER USE ONCE RESHARDED
}

/** Handler that by default does not do anything since by default the library will not cache. */
export async function reshardingEditGuildShardIds() {
  // PLACEHOLDER TO LET YOU UPDATE CACHED GUILDS
}
