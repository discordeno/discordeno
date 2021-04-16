import { DiscordenoShard, WebSocketRequest, ws } from "./ws.ts";

export function sendShardMessage(
  shard: number | DiscordenoShard,
  message: WebSocketRequest,
  highPriority = false,
) {
  if (typeof shard === "number") shard = ws.shards.get(shard)!;
  if (!shard) return;

  if (!highPriority) {
    shard.queue.push(message);
  } else {
    shard.queue.unshift(message);
  }

  ws.processQueue(shard.id);
}
