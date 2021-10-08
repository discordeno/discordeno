import { DiscordGatewayIntents } from "../types/gateway/gateway_intents.ts";
import type { GetGatewayBot } from "../types/gateway/get_gateway_bot.ts";
import { camelize } from "../util/utils.ts";
import { StartGatewayOptions } from "./start_gateway_options.ts";
import { GatewayManager } from "../bot.ts";

/** ADVANCED DEVS ONLY!!!!!!
 * Starts the standalone gateway.
 * This will require starting the bot separately.
 */
export async function startGateway(gateway: GatewayManager, options: StartGatewayOptions) {
  gateway.identifyPayload.token = `Bot ${options.token}`;
  gateway.secretKey = options.secretKey;
  gateway.firstShardId = options.firstShardId;
  gateway.url = options.url;
  if (options.shardsPerCluster) gateway.shardsPerCluster = options.shardsPerCluster;
  if (options.maxClusters) gateway.maxClusters = options.maxClusters;

  if (options.compress) {
    gateway.identifyPayload.compress = options.compress;
  }
  if (options.reshard) gateway.reshard = options.reshard;
  // Once an hour check if resharding is necessary
  setInterval(() => gateway.resharder(gateway), 1000 * 60 * 60);

  gateway.identifyPayload.intents = options.intents.reduce(
    (bits, next) => (bits |= typeof next === "string" ? DiscordGatewayIntents[next] : next),
    0
  );

  gateway.botGatewayData = camelize(
    await fetch(`https://discord.com/api/gateway/bot`, {
      headers: { Authorization: gateway.identifyPayload.token },
    }).then((res) => res.json())
  ) as GetGatewayBot;

  gateway.maxShards = options.maxShards || gateway.botGatewayData.shards;
  gateway.lastShardId = options.lastShardId || gateway.botGatewayData.shards - 1;

  gateway.spawnShards(gateway, gateway.firstShardId);
}
