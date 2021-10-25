import { DiscordGatewayIntents } from "../types/gateway/gateway_intents.ts";
import type { GetGatewayBot } from "../types/gateway/get_gateway_bot.ts";
import { StartGatewayOptions } from "./start_gateway_options.ts";
import { GatewayManager } from "../bot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

/** ADVANCED DEVS ONLY!!!!!!
 * Starts the standalone gateway.
 * This will require starting the bot separately.
 */
export async function startGateway(gateway: GatewayManager, options: StartGatewayOptions) {
  gateway.token = `Bot ${options.token}`;
  gateway.secretKey = options.secretKey;
  gateway.firstShardId = options.firstShardId;
  gateway.url = options.url;
  if (options.shardsPerCluster) gateway.shardsPerCluster = options.shardsPerCluster;
  if (options.maxClusters) gateway.maxClusters = options.maxClusters;

  if (options.compress) {
    gateway.compress = options.compress;
  }
  if (options.reshard) gateway.reshard = options.reshard;
  // Once an hour check if resharding is necessary
  setInterval(() => gateway.resharder(gateway), 1000 * 60 * 60);

  gateway.intents = options.intents.reduce(
    (bits, next) => (bits |= typeof next === "string" ? DiscordGatewayIntents[next] : next),
    0
  );

  const result = (await fetch(`https://discord.com/api/gateway/bot`, {
    headers: { Authorization: gateway.token },
  }).then((res) => res.json())) as SnakeCasedPropertiesDeep<GetGatewayBot>;

  gateway.url = result.url;
  gateway.sessionStartLimitTotal = result.session_start_limit.total;
  gateway.sessionStartLimitRemaining = result.session_start_limit.remaining;
  gateway.sessionStartLimitResetAfter = result.session_start_limit.reset_after;
  gateway.maxConcurrency = result.session_start_limit.max_concurrency;
  gateway.maxShards = options.maxShards || result.shards;
  gateway.lastShardId = options.lastShardId || result.shards - 1;

  gateway.spawnShards(gateway, gateway.firstShardId);
}
