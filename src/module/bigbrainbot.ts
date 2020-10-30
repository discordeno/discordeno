import { delay } from "../../deps.ts";
import { DiscordBotGatewayData, RequestManager } from "../../mod.ts";
import { endpoints } from "../constants/discord.ts";
import { ClientOptions, EventHandlers } from "../types/options.ts";
import { botGatewayData } from "./client.ts";

const botOptions = {
  createNextShard: false,
  workers: new Map<number, Worker>(),
  eventHandlers: {} as EventHandlers,
  botGatewayData: {} as DiscordBotGatewayData,
  customShards: [] as number[],
  shardsPerWorker: 25,
  identifyPayload: {
    token: "",
    compress: true,
    properties: {
      $os: "linux",
      $browser: "Discordeno",
      $device: "Discordeno",
    },
    intents: 0,
    shard: [0, 0],
  },
};

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startBigBrainBot(data: BigBrainBotOptions) {
  botOptions.identifyPayload.token = `Bot ${data.token}`;
  if (data.eventHandlers) botOptions.eventHandlers = data.eventHandlers;
  if (data.shards) botOptions.customShards = data.shards;
  if (data.compress) botOptions.identifyPayload.compress = data.compress;
  if (data.shardsPerWorker) botOptions.shardsPerWorker = data.shardsPerWorker;

  // Initial API connection to get info about bots connection
  botOptions.botGatewayData = await RequestManager.get(
    endpoints.GATEWAY_BOT,
  ) as DiscordBotGatewayData;

  botOptions.identifyPayload.intents = data.intents.reduce(
    (bits, next) => (bits |= next),
    0,
  );
  botOptions.identifyPayload.shard = [0, botGatewayData.shards];

  spawnBigBrainBotShards();
}

async function spawnBigBrainBotShards(shardID = 0, skipChecks = 0) {
  if (shardID >= botOptions.botGatewayData.shards) return;

  // 25 shards but shards start at 0 so we use 24
  const workerID = shardID % botOptions.shardsPerWorker - 1;
  const worker = botOptions.workers.get(workerID)

  // High max concurrency allows starting shards faster
  if (skipChecks) {
    // If the worker exists we just need to add
    if (worker) {
      worker.postMessage({ type: "CREATE_SHARD", shardID, workerID, botOptions });
    } else {
      const path = new URL("./shard.ts", import.meta.url).toString();
      const newWorker = new Worker(path, { type: "module", deno: true });
      // Add to worker map
      botOptions.workers.set(workerID, newWorker);
      newWorker.postMessage({ type: "CREATE_SHARD", shardID, workerID, botOptions });
    }

    spawnBigBrainBotShards(shardID + 1, skipChecks - 1);
  }

  // Make sure we can create a shard or we are waiting for shards to connect still.
  if (botOptions.createNextShard) {
    // !(shardid % botOptions.botGatewayData.session_start_limit.max_concurrency)
    botOptions.createNextShard = false;
    // Start the next few shards based on max concurrency
    spawnBigBrainBotShards(shardID + 1, botOptions.botGatewayData.session_start_limit.max_concurrency);
    return;
  }

  await delay(1000);
  spawnBigBrainBotShards(shardID);
}

export interface BigBrainBotOptions extends ClientOptions {
  /** This can be used to distribute your bot across different servers. For example, if you wanted 1 million shards per server you could control it using this. */
  shards?: [number, number];
  /** This can be used to forward the ws handling to a proxy. */
  wsURL?: string;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
  /** This allows you to control how many shards per worker. For the times where you can optimize with more shards per worker as your bot has less tasks per shard.
   * @default 25
   */
  shardsPerWorker?: number;
  /** The absolute file path to the file where the worker will run.  */
  workerFilePath?: string;
}
