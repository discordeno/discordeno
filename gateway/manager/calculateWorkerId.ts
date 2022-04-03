import { GatewayManager } from "./gatewayManager.ts";

export function calculateWorkerId(manager: GatewayManager, shardId: number) {
  let workerId = Math.floor((shardId) / manager.shardsPerWorker);
  if (workerId >= manager.totalWorkers) {
    workerId = manager.totalWorkers - 1;
  }

  return workerId;
}
