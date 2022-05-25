import { GatewayManager } from "./gatewayManager.ts";

/** Handler used to determine max number of shards to use based upon the max concurrency. */
export function calculateTotalShards(gateway: GatewayManager): number {
  if (gateway.manager.totalShards < 100) return gateway.manager.totalShards;

  return Math.ceil(
    gateway.manager.totalShards /
      (gateway.gatewayBot.sessionStartLimit.maxConcurrency === 1
        ? 16
        : gateway.gatewayBot.sessionStartLimit.maxConcurrency),
  ) * gateway.gatewayBot.sessionStartLimit.maxConcurrency;
}
