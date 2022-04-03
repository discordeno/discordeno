import { GatewayManager } from "./gatewayManager.ts";

export function calculateWorkerId(manager: GatewayManager, shardId: number) {
  console.log({ shardId, res: (shardId) / manager.shardsPerWorker });
  let workerId = Math.floor((shardId) / manager.shardsPerWorker);
  if (workerId >= manager.totalWorkers) {
    workerId = manager.totalWorkers - 1;
  }

  return workerId;
}
