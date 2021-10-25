import { DiscordenoShard, WebSocketRequest } from "./ws.ts";
import { GatewayManager } from "../bot.ts";

export function sendShardMessage(
  gateway: GatewayManager,
  shard: number | DiscordenoShard,
  message: WebSocketRequest,
  highPriority = false
) {
  if (typeof shard === "number") shard = gateway.shards.get(shard)!;
  if (!shard) return;

  if (!highPriority) {
    shard.queue.push(message);
  } else {
    shard.queue.unshift(message);
  }

  gateway.processGatewayQueue(gateway, shard.id);
}
