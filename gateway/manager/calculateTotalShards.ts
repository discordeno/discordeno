import { GatewayManager } from "./gatewayManager.ts";

/** Handler used to determine max number of shards to use based upon the max concurrency. */
export function calculateTotalShards(manager: GatewayManager): number {
  if (manager.manager.totalShards < 100) return manager.manager.totalShards;

  return Math.ceil(
    manager.manager.totalShards /
      (manager.gatewayBot.sessionStartLimit.maxConcurrency === 1
        ? 16
        : manager.gatewayBot.sessionStartLimit.maxConcurrency),
  ) * manager.gatewayBot.sessionStartLimit.maxConcurrency;
}
