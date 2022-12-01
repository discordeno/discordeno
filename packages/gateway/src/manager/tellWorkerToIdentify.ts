import { GatewayManager } from './gatewayManager.js'

/** Allows users to hook in and change to communicate to different workers across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellWorkerToIdentify (
  gateway: GatewayManager,
  _workerId: number,
  shardId: number,
  _bucketId: number
): Promise<void> {
  return await gateway.manager.identify(shardId)
}
