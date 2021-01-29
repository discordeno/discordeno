import { getGatewayBot } from "../../api/handlers/gateway.ts";
import { Intents } from "../../types/options.ts";
import { ws } from "./ws.ts";

/** ADVANCED DEVS ONLY!!!!!!
 * Starts the standalone gateway.
 * This will require starting the bot separately.
 */
export async function startGateway(options: StartGatewayOptions) {
  ws.identifyPayload.token = `Bot ${options.token}`;
  ws.firstShardID = options.firstShardID;
  ws.url = options.url;

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

  ws.spawnShards(ws.firstShardID);
}

export function spawnShards(shardID: number) {
  let skipChecks = 0;

  while (shardID <= ws.lastShardID) {
    if (skipChecks) {
      // Start The shard
      ws.identify(shardID, ws.maxShards);

      shardID++;
      skipChecks--;
      continue;
    }

    // Previous shards is still not fully ready.
    if (!ws.createNextShard) continue;

    // Allows next iteration to create shard
    ws.createNextShard = false;
    // Set the amount of shards to start up be the bots max concurrency limit
    skipChecks = ws.botGatewayData.sessionStartLimit.maxConcurrency;
  }
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
}
