/** Begin spawning shards. */
import {Bot} from "../bot.ts";

export function spawnShards(bot: Bot, firstShardId = 0) {
  /** Stored as bucketId: [clusterId, [ShardIds]] */
  const maxShards = bot.gateway.maxShards || bot.gateway.botGatewayData.shards;
  let cluster = 0;

  for (let index = firstShardId; index < bot.gateway.botGatewayData.sessionStartLimit.maxConcurrency; index++) {
    bot.gateway.log("DEBUG", `1. Running for loop in spawnShards function.`);
    // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
    for (let i = 0; i < maxShards; i++) {
      bot.gateway.log("DEBUG", `2. Running for loop in spawnShards function.`);
      const bucketId = i % bot.gateway.botGatewayData.sessionStartLimit.maxConcurrency;
      const bucket = bot.gateway.buckets.get(bucketId);

      if (!bucket) {
        // Create the bucket since it doesnt exist
        bot.gateway.buckets.set(bucketId, {
          clusters: [[cluster, i]],
          createNextShard: [],
        });

        if (cluster + 1 <= bot.gateway.maxClusters) cluster++;
      } else {
        // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
        const queue = bucket.clusters.find((q) => q.length < bot.gateway.shardsPerCluster + 1);
        if (queue) {
          // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
          queue.push(i);
        } else {
          if (cluster + 1 <= bot.gateway.maxClusters) cluster++;
          // ADD A NEW QUEUE FOR THIS SHARD
          bucket.clusters.push([cluster, i]);
        }
      }
    }
  }

  // SPREAD THIS OUT TO DIFFERENT CLUSTERS TO BEGIN STARTING UP
  bot.gateway.buckets.forEach((bucket, bucketId) => {
    bot.gateway.log("DEBUG", `3. Running forEach loop in spawnShards function.`);
    for (const [clusterId, ...queue] of bucket.clusters) {
      bot.gateway.log("DEBUG", `4. Running for of loop in spawnShards function.`);

      queue.forEach((shardId) => {
        bucket.createNextShard.push(async () => {
          await bot.gateway.tellClusterToIdentify(clusterId, shardId, bucketId);
        });
      });

      bucket.createNextShard.shift()?.();
    }
  });
}
