import { GatewayManager } from "../bot.ts";
import { GetGatewayBot } from "../types/gateway/get_gateway_bot.ts";

/** The handler to automatically reshard when necessary. */
export async function resharder(gateway: GatewayManager) {
  // TODO: is it possible to route this to REST?
  const results = (await fetch(`https://discord.com/api/gateway/bot`, {
    headers: { Authorization: gateway.token },
  }).then((res) => res.json())) as GetGatewayBot;

  const percentage = ((results.shards - gateway.maxShards) / gateway.maxShards) * 100;
  // Less than necessary% being used so do nothing
  if (percentage < gateway.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (results.sessionStartLimit.remaining < results.shards) {
    return;
  }

  // Begin resharding
  gateway.maxShards = results.shards;
  // If more than 100K servers, begin switching to 16x sharding
  if (gateway.maxShards && gateway.useOptimalLargeBotSharding) {
    gateway.maxShards = Math.ceil(
      gateway.maxShards /
        (results.sessionStartLimit.maxConcurrency === 1 ? 16 : results.sessionStartLimit.maxConcurrency)
    );
  }

  gateway.spawnShards(gateway, gateway.firstShardId);
}
