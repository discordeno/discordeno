import { getGatewayBot } from "../helpers/misc/get_gateway_bot.ts";
import { GatewayManager } from "../bot.ts";

/** The handler to automatically reshard when necessary. */
export async function resharder(gateway: GatewayManager) {
  gateway.botGatewayData = await getGatewayBot();

  const percentage = ((gateway.botGatewayData.shards - gateway.maxShards) / gateway.maxShards) * 100;
  // Less than necessary% being used so do nothing
  if (percentage < gateway.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (gateway.botGatewayData.sessionStartLimit.remaining < gateway.botGatewayData.shards) {
    return;
  }

  // Begin resharding
  gateway.maxShards = gateway.botGatewayData.shards;
  // If more than 100K servers, begin switching to 16x sharding
  if (gateway.maxShards && gateway.useOptimalLargeBotSharding) {
    gateway.maxShards = Math.ceil(
      gateway.maxShards /
        (gateway.botGatewayData.sessionStartLimit.maxConcurrency === 1
          ? 16
          : gateway.botGatewayData.sessionStartLimit.maxConcurrency)
    );
  }

  gateway.spawnShards(gateway, gateway.firstShardId);
}
