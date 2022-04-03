import { GatewayIntents } from "../../types/shared.ts";
import { createLeakyBucket } from "../../util/bucket.ts";
import { GAMER, TOKEN } from "../debug.ts";
import { createShard } from "../shard/createShard.ts";
import { Shard } from "../shard/types.ts";
import { calculateWorkerId } from "./calculateWorkerId.ts";
import { createGatewayManager, GatewayManager } from "./gatewayManager.ts";

export function prepareBuckets(manager: GatewayManager, firstShardId: number, lastShardId: number) {
  for (let i = 0; i < manager.gatewayBot.sessionStartLimit.maxConcurrency; ++i) {
    manager.buckets.set(i, {
      workers: [],
      leak: createLeakyBucket({
        max: 1,
        refillAmount: 1,
        // special number which is proven to be working dont change
        refillInterval: manager.spawnShardDelay,
      }),
    });
  }

  // ORGANIZE ALL SHARDS INTO THEIR OWN BUCKETS
  for (let shardId = firstShardId; shardId <= lastShardId; ++shardId) {
    // gateway.debug("GW DEBUG", `1. Running for loop in spawnShards function for shardId ${i}.`);
    if (shardId >= manager.totalShards) {
      throw new Error(
        `Shard (id: ${shardId}) is bigger or equal to the used amount of used shards which is ${manager.totalShards}`,
      );
    }

    const bucketId = shardId % manager.gatewayBot.sessionStartLimit.maxConcurrency;
    const bucket = manager.buckets.get(bucketId);
    if (!bucket) {
      throw new Error(
        `Shard (id: ${shardId}) got assigned to an illegal bucket id: ${bucketId}, expected a bucket id between 0 and ${
          manager.gatewayBot.sessionStartLimit.maxConcurrency - 1
        }`,
      );
    }

    // FIND A QUEUE IN THIS BUCKET THAT HAS SPACE
    // const worker = bucket.workers.find((w) => w.queue.length < gateway.shardsPerWorker);
    const workerId = manager.calculateWorkerId(shardId);
    const worker = bucket.workers.find((w) => w.id === workerId);
    if (worker) {
      // IF THE QUEUE HAS SPACE JUST ADD IT TO THIS QUEUE
      worker.queue.push(shardId);
    } else {
      bucket.workers.push({ id: workerId, queue: [shardId] });
    }
  }
}

const shards = new Map<number, Shard>();
/** Begin spawning shards. */
export function spawnShards(manager: GatewayManager, firstShardId = 0) {
  // PREPARES THE MAX SHARD COUNT BY CONCURRENCY
  if (manager.resharding.useOptimalLargeBotSharding) {
    // gateway.debug("GW DEBUG", "[Spawning] Using optimal large bot sharding solution.");
    // gateway.maxShards = gateway.calculateMaxShards(gateway.maxShards, gateway.maxConcurrency);
  }

  // PREPARES ALL SHARDS IN SPECIFIC BUCKETS
  prepareBuckets(manager, firstShardId, manager.lastShardId ? manager.lastShardId : manager.totalShards);

  console.log(Deno.inspect(manager.buckets, { depth: 10 }));

  // return;

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

      let pSt = performance.now();
      const waitingConnects = [];
      for (const shardId of worker.queue) {
        const shard = createShard({
          id: shardId,
          gatewayConfig: {
            compress: true,
            url: "wss://gateway.discord.gg",
            version: 10,
            intents: GatewayIntents.Guilds |
              GatewayIntents.GuildMessages |
              GatewayIntents.DirectMessages |
              GatewayIntents.GuildMembers |
              GatewayIntents.GuildBans |
              GatewayIntents.GuildEmojis |
              GatewayIntents.GuildVoiceStates |
              GatewayIntents.GuildInvites |
              GatewayIntents.GuildMessageReactions |
              GatewayIntents.DirectMessageReactions,
            properties: {
              $os: "Discordeno",
              $browser: "Discordeno",
              $device: "Discordeno",
            },
            token: GAMER,
          },
          totalShards: manager.totalShards,
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

        shards.set(shardId, shard);
      }

      setInterval(() => {
        for (const shardId of worker.queue) {
          console.log({ shard: shardId, state: shards.get(shardId)?.state });
        }
      }, 60_000);

      console.log(bucket);

      for (const shardId of worker.queue) {
        const shard = shards.get(shardId)!;
        await startBucket.acquire(1);
        shard.identify();
      }
    }
  });
}

const manager = createGatewayManager({
  handleDiscordPayload: () => {},
  gatewayBot: {
    url: "wss://gateway.discord.gg",
    shards: 10,
    sessionStartLimit: {
      total: 2000,
      remaining: 100,
      resetAfter: 10000,
      maxConcurrency: 1,
    },
  },
  createShardOptions: {},
});

spawnShards(manager);
