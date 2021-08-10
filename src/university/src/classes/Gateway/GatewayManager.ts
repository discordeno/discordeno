import { GetGatewayBot } from "../../../../types/gateway/get_gateway_bot.ts";
import { Collection } from "../../../../util/collection.ts";
import Client from "../Client.ts";
import Shard from "./Shard.ts";

export class GatewayManager extends Collection<number, Shard> {
  /** The client itself */
  client: Client;
  /** The gateway intents used for connecting. */
  intents = 0;
  /** The maximum number of shards allowed during this connection. */
  maxShards = 0;
  /** The last shard id that will be connected. */
  lastShardId = 0;
  /** The gateway version number to be used. */
  version = 9;
  /** Whether or not the ready event has been emitted once all shards came online. */
  isReady = false;
  /** Whether to use compression for the websocket. */
  compress = false;
  /** Whether or not to automatically reshard. */
  reshard = true;
  /** The percentage at which resharding should occur. */
  reshardPercentage = 80;
  /** The delay in milliseconds to wait before spawning next shard. OPTIMAL IS ABOVE 2500. YOU DON"T WANT TO HIT THE RATE LIMIT!!! */
  spawnShardDelay = 2500;
  /** Whether or not the resharder should automatically switch to LARGE BOT SHARDING when you are above 100K servers. */
  useOptimalLargeBotSharding = true;
  /** The gateway information provided by discord to connect. */
  botGatewayData: GetGatewayBot = {
    url: "wss://gateway.discord.gg/",
    shards: 1,
    sessionStartLimit: {
      total: 1000,
      remaining: 1000,
      resetAfter: 0,
      maxConcurrency: 1,
    },
  };
  /** The buckets prepared for this session. */
  buckets: Collection<
    number,
    {
      /** The shard ids in this bucket. */
      queue: number[];
      /** The handler to spawn the next shard when possible. */
      createNextShard: (() => Promise<void>)[];
    }
  >;
  /** The maximum amount of workers allowed when creating this session. Defaults to 16. */
  maxWorkers: number;
  /** The amount of shards per worker. Defaults to 25. */
  shardsPerWorker: number;
  utf8decoder = new TextDecoder();
  loadingShards = new Collection<
    number,
    {
      shardId: number;
      resolve: (value: unknown) => void;
      startedAt: number;
    }
  >();

  constructor(client: Client) {
    super();

    this.client = client;
    this.buckets = new Collection();
    this.maxWorkers = 16;
    this.shardsPerWorker = 25;
  }

  async spawnShards(firstShardId = 0) {
    // FIRST FILLS THE BUCKETS
    this.prepareBuckets(firstShardId);
    // NEXT FILLS THE SHARD CREATION HANDLERS IN THOSE BUCKETS
    this.prepareShards();
    // BEGINS CREATING SHARDS WIH HANDLERS IN EACH BUCKET
    if (this.buckets.size === 1) {
      return await this.buckets.first()!.createNextShard.shift()?.();
    }

    // BIGGER BOTS THAT HAVE MULTIPLE BUCKETS CAN RUN SAME TIME!
    await Promise.all(this.buckets.map((bucket) => bucket.createNextShard.shift()?.()));
  }

  prepareBuckets(firstShardId = 0) {
    for (let i = firstShardId; i <= this.lastShardId; i++) {
      this.client.emit("DEBUG", "Running for loop inside spawnshards to prepare buckets.");
      const bucketId = i % this.botGatewayData.sessionStartLimit.maxConcurrency;
      const bucket = this.buckets.get(bucketId);
      if (!bucket) {
        this.buckets.set(bucketId, { queue: [i], createNextShard: [] });
      } else bucket.queue.push(i);
    }
  }

  prepareShards() {
    let clusterId = 0;
    let shardsInCluster = 0;

    for (const [bucketId, bucket] of this.buckets.entries()) {
      for (const shardId of bucket.queue) {
        this.client.emit("DEBUG", `Running for loop inside startup for each bucket.`);

        bucket.createNextShard.push(async () => {
          await this.tellClusterToIdentify(shardId, clusterId, bucketId);
        });

        if (shardsInCluster >= this.shardsPerWorker) {
          clusterId++;
          shardsInCluster = 0;
        } else {
          shardsInCluster++;
        }
      }
    }
  }

  tellClusterToIdentify(shardId: number, clusterId: number, bucketId: number): void | Promise<void> {
    const shard = new Shard(this.client, shardId, clusterId, bucketId);
    shard.identify();
  }
}
