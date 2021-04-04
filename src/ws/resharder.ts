import { ws } from "./ws.ts";
import { getGatewayBot } from "../helpers/misc/get_gateway_bot.ts";

/** The handler to automatically reshard when necessary. */
export async function resharder() {
  const data = await getGatewayBot();
  const percentage = (data.shards - ws.maxShards) / ws.maxShards * 100;
  // Less than necessary% being used so do nothing
  if (percentage < ws.reshardPercentage) return;

  // Don't have enough identify rate limits to reshard
  if (data.session_start_limit.remaining < data.shards) return;

  // Begin resharding
  ws.maxShards = data.shards;

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
