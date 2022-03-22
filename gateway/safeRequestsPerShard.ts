import { GatewayManager } from "./gatewayManager.ts";
import { DiscordenoShard } from "./shard.ts";

export function safeRequestsPerShard(gateway: GatewayManager, shard: DiscordenoShard) {
  // * 2 adds extra safety layer for discords OP 1 requests that we need to respond to
  const safeRequests = gateway.maxRequestsPerInterval -
    Math.ceil(gateway.queueResetInterval / shard.heartbeat.interval) * 2;
  return safeRequests > 0 ? safeRequests : 0;
}
