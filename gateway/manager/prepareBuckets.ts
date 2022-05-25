import { createLeakyBucket } from "../../util/bucket.ts";
import { GatewayManager } from "./gatewayManager.ts";

export function prepareBuckets(gateway: GatewayManager) {
  for (let i = 0; i < gateway.gatewayBot.sessionStartLimit.maxConcurrency; ++i) {
    gateway.buckets.set(i, {
      workers: [],
      leak: createLeakyBucket({
        max: 1,
        refillAmount: 1,
        // special number which is proven to be working dont change
        refillInterval: gateway.spawnShardDelay,
      }),
    });
  }

  // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
  for (let shardId = gateway.firstShardId; shardId <= gateway.lastShardId; ++shardId) {
    // gateway.debug("GW DEBUG", `1. Running for loop in spawnShards function for shardId ${i}.`);
    if (shardId >= gateway.manager.totalShards) {
      throw new Error(
        `Shard (id: ${shardId}) is bigger or equal to the used amount of used shards which is ${gateway.manager.totalShards}`,
      );
    }

    const bucketId = shardId % gateway.gatewayBot.sessionStartLimit.maxConcurrency;
    const bucket = gateway.buckets.get(bucketId);
    if (!bucket) {
      throw new Error(
        `Shard (id: ${shardId}) got assigned to an illegal bucket id: ${bucketId}, expected a bucket id between 0 and ${
          gateway.gatewayBot.sessionStartLimit.maxConcurrency - 1
        }`,
      );
    }

    // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
    // const worker = bucket.workers.find((w) => w.queue.length < gateway.shardsPerWorker);
    const workerId = gateway.calculateWorkerId(shardId);
    const worker = bucket.workers.find((w) => w.id === workerId);
    if (worker) {
      // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
      worker.queue.push(shardId);
    } else {
      bucket.workers.push({ id: workerId, queue: [shardId] });
    }
  }
}
