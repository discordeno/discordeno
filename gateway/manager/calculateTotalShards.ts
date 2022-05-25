import { GatewayManager } from "./gatewayManager.ts";

/** Handler used to determine max number of shards to use based upon the max concurrency. */
export function calculateTotalShards(gateway: GatewayManager): number {
  // Bots under 100k servers do not have access to total shards.
  if (gateway.manager.totalShards < 100) return gateway.manager.totalShards;

  // Calculate a multiple of `maxConcurrency` which can be used to connect to the gateway.
  return Math.ceil(
    gateway.manager.totalShards /
      // If `maxConcurrency` is 1 we can safely use 16.
      (gateway.gatewayBot.sessionStartLimit.maxConcurrency === 1
        ? 16
        : gateway.gatewayBot.sessionStartLimit.maxConcurrency),
  ) * gateway.gatewayBot.sessionStartLimit.maxConcurrency;
}
