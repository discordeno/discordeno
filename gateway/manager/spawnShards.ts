import { createLeakyBucket, LeakyBucket } from "../../util/bucket.ts";
import { Collection } from "../../util/collection.ts";
import { delay } from "../../util/utils.ts";
import { GAMER, TOKEN } from "../debug.ts";
import { censor, createShard } from "../shard/createShard.ts";
import { Shard } from "../shard/types.ts";

const gateway = {
  maxConcurrency: 1,
  buckets: new Collection<
    number,
    {
      workers: number[][];
      leak: LeakyBucket;
      createNextShard: (() => Promise<unknown>)[];
    }
  >(),
  maxShards: 10,
  lastShardId: 10,
  shardsPerWorker: 100,
  maxWorkers: 1,
  useOptimalLargeBotSharding: false,
};

export function prepareBuckets(firstShardId: number, lastShardId: number) {
  /** Stored as bucketId: [workerId, [ShardIds]] */
  let worker = 0;

  for (let i = 0; i < gateway.maxConcurrency; i++) {
    gateway.buckets.set(i, {
      workers: [],
      leak: createLeakyBucket({
        max: 1,
        refillAmount: 1,
        refillInterval: 5100,
      }),
      createNextShard: [],
    });
  }

  // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
  for (let i = firstShardId; i < lastShardId; i++) {
    // gateway.debug("GW DEBUG", `1. Running for loop in spawnShards function for shardId ${i}.`);
    if (i >= gateway.maxShards) {
      continue;
    }

    const bucketId = i % gateway.maxConcurrency;
    const bucket = gateway.buckets.get(bucketId);
    if (!bucket) throw new Error("Bucket not found when spawning shards.");

    // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
    // + 1 cause .workers first item is worker id [workerId, shardId, shardId2...]
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

const shards = new Map<number, Shard>();
/** Begin spawning shards. */
export function spawnShards(firstShardId = 0) {
  // PREPARES THE MAX SHARD COUNT BY CONCURRENCY
  if (gateway.useOptimalLargeBotSharding) {
    // gateway.debug("GW DEBUG", "[Spawning] Using optimal large bot sharding solution.");
    // gateway.maxShards = gateway.calculateMaxShards(gateway.maxShards, gateway.maxConcurrency);
  }

  // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
  prepareBuckets(firstShardId, gateway.lastShardId ? gateway.lastShardId : gateway.maxShards);

  console.log(Deno.inspect(gateway.buckets, { depth: 10 }));

  // return;

  // SPREAD THIS OUT TO DIFFERENT WORKERS TO BEGIN STARTING UP
  gateway.buckets.forEach(async (bucket, bucketId) => {
    // gateway.debug("GW DEBUG", `2. Running forEach loop in spawnShards function.`);
    let startedAt = performance.now();
    for (const [workerId, ...queue] of bucket.workers) {
      // gateway.debug("GW DEBUG", `3. Running for of loop in spawnShards function.`);

      let pSt = performance.now();
      const waitingConnects = [];
      for (const shardId of queue) {
        const shard = createShard({
          id: shardId,
          gatewayConfig: {
            compress: true,
            url: "wss://gateway.discord.gg",
            version: 10,
            intents: 1 << 0,
            properties: {
              $os: "Discordeno",
              $browser: "Discordeno",
              $device: "Discordeno",
            },
            token: GAMER,
          },
          totalShards: gateway.maxShards,
          // makePresence: (shardId) => ({
          //   activities: [
          //     {
          //       name: `Cards Against Humanity #${shardId}`,
          //       type: 0,
          //       createdAt: Date.now(),
          //     },
          //   ],
          //   status: "dnd",
          // }),
          requestIdentify: async () => {
            await bucket.leak.acquire(1);
          },
          event: {
            // heartbeat: (shard) => {
            //   console.log({ type: "heartbeating", shard: shard.id });
            // },
            // heartbeatAck: (shard) => {
            //   console.log({ type: "heartbeatAck", shard: shard.id });
            // },
            // hello: (shard) => {
            //   console.log({ type: "hello", shard: shard.id });
            // },
            invalidSession: (shard, resumable: boolean) => {
              throw console.log({ type: "invalidSession", shard: shard.id, resumable });
            },
            // resuming: (shard) => {
            //   console.log({ type: "resuming", shard: shard.id });
            // },
            // resumed: (shard) => {
            //   console.log({ type: "resumed", shard: shard.id });
            // },
            // requestedReconnect: (shard) => {
            //   console.log({ type: "requestedReconnect", shard: shard.id });
            // },
            // connecting: (shard) => {
            //   console.log({ type: "connecting", shard: shard.id });
            // },
            // connected: (shard) => {
            //   console.log({ type: "connected", shard: shard.id });
            // },
            // disconnected: (shard) => {
            //   console.log({ type: "disconnected", shard: shard.id });
            // },
            // identifying: (shard) => {
            //   console.log({ type: "identifying", shard: shard.id });
            // },
            // identified: (shard) => {
            //   console.log({ type: "identified", shard: shard.id });
            // },
            message: (shard, payload) => {
              // console.log({ type: "message", shard: shard.id });
              if (payload.t === "READY") {
                let now = performance.now();
                let took = now - startedAt;
                startedAt = now;
                console.log(`[READY] Shard #${shard.id} took: ${took}`);
              }
            },
          },
        });

        // shard.identify();
        waitingConnects.push(shard);

        shards.set(shardId, shard);

        // bucket.createNextShard.push(async () => {
        //   await tellWorkerToIdentify(gateway, workerId, shardId, bucketId);
        // });
      }

      await Promise.all(waitingConnects.map(async (c) => c.connect()));

      console.log("FINISHED SHARD PREPARATION TOOK: ", performance.now() - pSt);

      setInterval(() => {
        for (const shardId of queue) {
          console.log({ shard: shardId, state: shards.get(shardId)?.state });
        }
      }, 60_000);

      for (const shardId of queue) {
        shards.get(shardId)?.identify();
      }
    }
    // await bucket.createNextShard.shift()?.();
  });
}

spawnShards();
