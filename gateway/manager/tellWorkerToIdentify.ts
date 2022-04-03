import { GatewayManager } from "./gatewayManager.ts";

/** Allows users to hook in and change to communicate to different workers across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellWorkerToIdentify(
  gateway: GatewayManager,
  _workerId: number,
  shardId: number,
  _bucketId: number,
) {
  await gateway.identify(gateway, shardId, gateway.maxShards);
}
