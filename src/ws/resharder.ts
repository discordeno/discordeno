import { getGatewayBot } from "../helpers/misc/get_gateway_bot.ts";
import { camelKeysToSnakeCase } from "../util/utils.ts";
import { ws } from "./ws.ts";

/** The handler to automatically reshard when necessary. */
export async function resharder() {
  ws.botGatewayData = camelKeysToSnakeCase(await getGatewayBot());

  const percentage =
    ((ws.botGatewayData.shards - ws.maxShards) / ws.maxShards) * 100;
  // Less than necessary% being used so do nothing
  if (percentage < ws.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (ws.botGatewayData.sessionStartLimit.remaining < ws.botGatewayData.shards)
    return;

  // Begin resharding
  ws.maxShards = ws.botGatewayData.shards;

  ws.spawnShards(ws.firstShardId);
}
