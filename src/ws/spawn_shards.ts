import { Collection } from "../util/collection.ts";
import { ws } from "./ws.ts";

/** Begin spawning shards. */
export function spawnShards(firstShardId = 0) {
  /** Stored as bucketId: [clusterId, [ShardIds]] */
  const buckets = new Collection<number, number[][]>();
  const maxShards = ws.maxShards || ws.botGatewayData.shards;
  let cluster = 0;

  for (
    let index = firstShardId;
    index < ws.botGatewayData.sessionStartLimit.maxConcurrency;
    index++
  ) {
    // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
    for (let i = 0; i < maxShards; i++) {
      const bucketId = i % ws.botGatewayData.sessionStartLimit.maxConcurrency;
      const bucket = buckets.get(bucketId);

      if (!bucket) {
        // Create the bucket since it doesnt exist
        buckets.set(bucketId, [[cluster, i]]);

        if (cluster + 1 <= ws.maxClusters) cluster++;
      } else {
        // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
        const queue = bucket.find((q) => q.length < ws.shardsPerCluster + 1);
        if (queue) {
          // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
          queue.push(i);
        } else {
          if (cluster + 1 <= ws.maxClusters) cluster++;
          // ADD A NEW QUEUE FOR THIS SHARD
          bucket.push([cluster, i]);
        }
      }
    }
  }

  // SPREAD THIS OUT TO DIFFERENT CLUSTERS TO BEGIN STARTING UP
  buckets.forEach(async (bucket, bucketId) => {
    for (const [clusterId, ...queue] of bucket) {
      let shardId = queue.shift();

      while (shardId !== undefined) {
        console.log("spawn shards");
        await ws.tellClusterToIdentify(clusterId as number, shardId, bucketId);
        shardId = queue.shift();
      }
    }
  });
}
