import { getGatewayBot } from "../../api/handlers/gateway.ts";
import { Intents } from "../../types/options.ts";
import { Collection } from "../../util/collection.ts";
import { ws } from "./ws.ts";

/** ADVANCED DEVS ONLY!!!!!!
 * Starts the standalone gateway.
 * This will require starting the bot separately.
 */
export async function startGateway(options: StartGatewayOptions) {
  ws.identifyPayload.token = `Bot ${options.token}`;
  ws.firstShardID = options.firstShardID;
  ws.url = options.url;
  if (options.shardsPerCluster) ws.shardsPerCluster = options.shardsPerCluster;
  if (options.maxClusters) ws.maxClusters = options.maxClusters;

  if (options.compress) {
    ws.identifyPayload.compress = options.compress;
  }

  ws.identifyPayload.intents = options.intents.reduce(
    (bits, next) => (bits |= typeof next === "string" ? Intents[next] : next),
    0,
  );

  const data = await getGatewayBot();
  ws.maxShards = options.maxShards || data.shards;
  ws.lastShardID = options.lastShardID || data.shards - 1;

  // TODO: ALL THE FOLLOWING CAN BE REPLACED BY THIS 1 LINE
  // ws.botGatewayData = snakeToCamel(await getGatewayBot())
  ws.botGatewayData.sessionStartLimit.total = data.session_start_limit.total;
  ws.botGatewayData.sessionStartLimit.resetAfter =
    data.session_start_limit.reset_after;
  ws.botGatewayData.sessionStartLimit.remaining =
    data.session_start_limit.remaining;
  ws.botGatewayData.sessionStartLimit.maxConcurrency =
    data.session_start_limit.max_concurrency;
  ws.botGatewayData.shards = data.shards;
  ws.botGatewayData.url = data.url;

  // TODO: LOG THIS IS HAPPENING
  ws.spawnShards(ws.firstShardID);
}

/** Begin spawning shards.
 * TODO: Put in a queue system and support clustering
 */
export function spawnShards(shardID: number) {
  /** Stored as bucketID: [clusterID, [ShardIDs]] */
  const buckets = new Collection<number, number[][]>();
  const maxShards = ws.maxShards || ws.botGatewayData.shards;
  let cluster = 0;

  for (
    let index = 0;
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
        else {
          // TODO: LOG THIS HAS HAPPENED
        }
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

/** Allows users to hook in and change to communicate to different clusters across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellClusterToIdentify(
  clusterID: number,
  shardID: number,
  bucketID: number,
) {
  // TODO: resolve promise 5 sec after ready
  await ws.identify(shardID, ws.maxShards);
}

export interface StartGatewayOptions {
  /** The bot token. */
  token: string;
  /** Whether or not to use compression for gateway payloads. */
  compress?: boolean;
  /** The intents you would like to enable. */
  intents: (Intents | keyof typeof Intents)[];
  /** The max amount of shards used for identifying. This can be useful for zero-downtime updates or resharding. */
  maxShards?: number;
  /** The first shard ID for this group of shards. */
  firstShardID: number;
  /** The last shard ID for this group. If none is provided, it will default to loading all shards. */
  lastShardID?: number;
  /** The url to forward all payloads to. */
  url: string;
  /** The amount of shards per cluster. By default this is 25. Use this to spread the load from shards to different CPU cores. */
  shardsPerCluster?: number;
  /** The maximum amount of clusters available. By default this is 4. Another way to think of cluster is how many CPU cores does your server/machine have. */
  maxClusters?: number;
}
