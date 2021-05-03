const config = {
  maxConcurrency: 16,
  maxShards: 1120,
  maxClusters: 140,
  shardsPerCluster: 8,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function organizeClusters() {
  const clusters = new Map();
  const buckets = new Map();
  const shardClusters = new Map<number, number>();
  let cluster = 0;

  for (let i = 0; i < config.maxShards; i++) {
    const shards = clusters.get(cluster);
    if (!shards) clusters.set(cluster, [i]);
    else {
      if (shards.length < config.shardsPerCluster) shards.push(i);
      else {
        cluster++;
        clusters.set(cluster, [i]);
      }
    }

    shardClusters.set(i, cluster);
  }

  for (let i = 0; i < config.maxShards; i++) {
    const bucketID = i % config.maxConcurrency;
    const bucket = buckets.get(bucketID);
    if (!bucket) {
      buckets.set(bucketID, [i]);
    } else {
      bucket.push(i);
    }
  }

  return { clusters, buckets };
}

function startup() {
  const { clusters, buckets } = organizeClusters();

  // SPREAD THIS OUT TO DIFFERENT CLUSTERS TO BEGIN STARTING UP
  // FOREACH will have this concurrently
  buckets.forEach(async (bucket, bucketID) => {
    for (const queue of bucket) {
      for (const shardID of queue) {
        console.log(
          `Bucket ID:`,
          bucketID,
          "Cluster ID:",
          clusters.get(shardID),
          "Shard ID:",
          shardID,
        );
        redis.publish(
          "sharder",
          JSON.stringify({ clusterID: clusters.get(shardID), shardID }),
        );
      }

      // AFTER THIS QUEUE IS CREATED WE WAIT FOR ALL SHARDS TO LOAD BEFORE NEXT CLUSTER
      // 5 SECONDS PER SHARD + EXTRA 10 TO BE SAFE
      await sleep(config.shardsPerCluster * 5000 + 10000);
    }
  });
}

startup();
setInterval(startup, 60000 * 5);
