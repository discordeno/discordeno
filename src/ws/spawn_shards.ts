import { ws } from "./ws.ts";

/** Begin spawning shards. */
export function spawnShards(firstShardId = 0) {
  /** Stored as bucketId: [clusterId, [ShardIds]] */
  const maxShards = ws.maxShards || ws.botGatewayData.shards;
  let cluster = 0;

  for (let index = firstShardId; index < ws.botGatewayData.sessionStartLimit.maxConcurrency; index++) {
    ws.log("DEBUG", `1. Running for loop in spawnShards function.`);
    // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
    for (let i = 0; i < maxShards; i++) {
      ws.log("DEBUG", `2. Running for loop in spawnShards function.`);
      const bucketId = i % ws.botGatewayData.sessionStartLimit.maxConcurrency;
      const bucket = ws.buckets.get(bucketId);

      if (!bucket) {
        // Create the bucket since it doesn't exist
        ws.buckets.set(bucketId, {
          clusters: [[cluster, i]],
          createNextShard: [],
        });

        if (cluster + 1 <= ws.maxClusters) cluster++;
      } else {
        // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
        const queue = bucket.clusters.find((q) => q.length < ws.shardsPerCluster + 1);
        if (queue) {
          // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
          queue.push(i);
        } else {
          if (cluster + 1 <= ws.maxClusters) cluster++;
          // ADD A NEW QUEUE FOR THIS SHARD
          bucket.clusters.push([cluster, i]);
        }
      }
    }
  }

  // SPREAD THIS OUT TO DIFFERENT CLUSTERS TO BEGIN STARTING UP
  ws.buckets.forEach((bucket, bucketId) => {
    ws.log("DEBUG", `3. Running forEach loop in spawnShards function.`);
    for (const [clusterId, ...queue] of bucket.clusters) {
      ws.log("DEBUG", `4. Running for of loop in spawnShards function.`);

      queue.forEach((shardId) => {
        bucket.createNextShard.push(async () => {
          await ws.tellClusterToIdentify(clusterId, shardId, bucketId);
        });
      });

      bucket.createNextShard.shift()?.();
    }
  });
}
