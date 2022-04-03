import { GatewayIntents } from "../../types/shared.ts";
import { createLeakyBucket } from "../../util/bucket.ts";
import { createShard } from "../shard/createShard.ts";
import { Shard } from "../shard/types.ts";
import { createGatewayManager, GatewayManager } from "./gatewayManager.ts";

/** Begin spawning shards. */
export function spawnShards(manager: GatewayManager, firstShardId = 0) {
  // PREPARES THE MAX SHARD COUNT BY CONCURRENCY
  if (manager.resharding.useOptimalLargeBotSharding) {
    // gateway.debug("GW DEBUG", "[Spawning] Using optimal large bot sharding solution.");
    manager.manager.totalShards = manager.calculateTotalShards(
      manager,
    );
  }

  // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
  manager.prepareBuckets(
    manager,
    firstShardId,
    manager.lastShardId ? manager.lastShardId : manager.manager.totalShards,
  );

  // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
  manager.buckets.forEach(async (bucket, bucketId) => {
    // gateway.debug("GW DEBUG", `2. Running forEach loop in spawnShards function.`);
    let startedAt = performance.now();

    // Special startup bucket,
    // Important for custom worker identify system
    const startBucket = createLeakyBucket({
      max: 1,
      refillAmount: 1,
      // special number which is proven to be working dont change
      refillInterval: manager.spawnShardDelay,
    });

    for (const worker of bucket.workers) {
      // gateway.debug("GW DEBUG", `3. Running for of loop in spawnShards function.`);

      for (const shardId of worker.queue) {
        await startBucket.acquire(1);
        // missing await is intended here
        manager.tellWorkerToIdentify(manager, worker.id, shardId, bucketId);
      }
    }
  });
}
