import { Collection } from "../util/collection.ts";
import { ws } from "./ws.ts";

/** Begin spawning shards. */
export function spawnShards(firstShardID = 0) {
  /** Stored as bucketID: [clusterID, [ShardIDs]] */
  const buckets = new Collection<number, number[][]>();
  const maxShards = ws.maxShards || ws.botGatewayData.shards;
  let cluster = 0;

  for (
    let index = firstShardID;
    index < ws.botGatewayData.sessionStartLimit.maxConcurrency;
    index++
  ) {
    // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
    for (let i = 0; i < maxShards; i++) {
      const bucketID = i % ws.botGatewayData.sessionStartLimit.maxConcurrency;
      const bucket = buckets.get(bucketID);

      if (!bucket) {
        // Create the bucket since it doesnt exist
        buckets.set(bucketID, [[cluster, i]]);

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
  buckets.forEach(async (bucket, bucketID) => {
    for (const [clusterID, ...queue] of bucket) {
      let shardID = queue.shift();

      while (shardID !== undefined) {
        await ws.tellClusterToIdentify(clusterID as number, shardID, bucketID);
        shardID = queue.shift();
      }
    }
  });
}
