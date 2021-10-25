/** Begin spawning shards. */
import { GatewayManager } from "../bot.ts";

export function spawnShards(gateway: GatewayManager, firstShardId = 0) {
  /** Stored as bucketId: [clusterId, [ShardIds]] */
  const maxShards = gateway.lastShardId || gateway.maxShards;
  let worker = 0;

  for (let i = 0; i < gateway.maxConcurrency; i++) {
    gateway.buckets.set(i, {
      workers: [],
      createNextShard: [],
    });
  }

  // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
  for (let i = firstShardId; i < maxShards; i++) {
    gateway.log("DEBUG", `2. Running for loop in spawnShards function.`);
    const bucketId = i % gateway.maxConcurrency;
    const bucket = gateway.buckets.get(bucketId);
    if (!bucket) throw new Error("Bucket not found when spawning shards.");

    // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
    const queue = bucket.workers.find((q) => q.length < gateway.shardsPerCluster + 1);
    if (queue) {
      // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
      queue.push(i);
    } else {
      if (worker + 1 <= gateway.maxClusters) worker++;
      // ADD A NEW QUEUE FOR THIS SHARD
      bucket.workers.push([worker, i]);
    }
  }

  // SPREAD THIS OUT TO DIFFERENT CLUSTERS TO BEGIN STARTING UP
  gateway.buckets.forEach(async (bucket, bucketId) => {
    gateway.log("DEBUG", `3. Running forEach loop in spawnShards function.`);
    for (const [workerId, ...queue] of bucket.workers) {
      gateway.log("DEBUG", `4. Running for of loop in spawnShards function.`);

      queue.forEach((shardId) => {
        bucket.createNextShard.push(async () => {
          await gateway.tellClusterToIdentify(gateway, workerId, shardId, bucketId);
        });
      });

      await bucket.createNextShard.shift()?.();
    }
  });
}
