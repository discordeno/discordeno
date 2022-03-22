/** Begin spawning shards. */

import { GatewayManager } from "./gatewayManager.ts";

export function prepareBuckets(gateway: GatewayManager, firstShardId: number, lastShardId: number) {
  /** Stored as bucketId: [workerId, [ShardIds]] */
  let worker = 0;

  for (let i = 0; i < gateway.maxConcurrency; i++) {
    gateway.buckets.set(i, {
      workers: [],
      createNextShard: [],
    });
  }

  // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
  for (let i = firstShardId; i < lastShardId; i++) {
    gateway.debug("GW DEBUG", `1. Running for loop in spawnShards function for shardId ${i}.`);
    if (i >= gateway.maxShards) {
      continue;
    }

    const bucketId = i % gateway.maxConcurrency;
    const bucket = gateway.buckets.get(bucketId);
    if (!bucket) throw new Error("Bucket not found when spawning shards.");

    // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
    const queue = bucket.workers.find((q) => q.length < gateway.shardsPerWorker + 1);
    if (queue) {
      // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
      queue.push(i);
    } else {
      if (worker + 1 <= gateway.maxWorkers) worker++;
      // ADD A NEW QUEUE FOR THIS SHARD
      bucket.workers.push([worker, i]);
    }
  }
}

export function spawnShards(gateway: GatewayManager, firstShardId = 0) {
  // PREPARES THE MAX SHARD COUNT BY CONCURRENCY
  if (gateway.useOptimalLargeBotSharding) {
    gateway.debug("GW DEBUG", "[Spawning] Using optimal large bot sharding solution.");
    gateway.maxShards = gateway.calculateMaxShards(gateway.maxShards, gateway.maxConcurrency);
  }

  // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
  prepareBuckets(gateway, firstShardId, gateway.lastShardId ? gateway.lastShardId + 1 : gateway.maxShards);

  // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
  gateway.buckets.forEach(async (bucket, bucketId) => {
    gateway.debug("GW DEBUG", `2. Running forEach loop in spawnShards function.`);
    for (const [workerId, ...queue] of bucket.workers) {
      gateway.debug("GW DEBUG", `3. Running for of loop in spawnShards function.`);

      for (const shardId of queue) {
        bucket.createNextShard.push(async () => {
          await gateway.tellWorkerToIdentify(gateway, workerId, shardId, bucketId);
        });
      }
    }
    await bucket.createNextShard.shift()?.();
  });
}
