import { GatewayIntents } from "../../types/shared.ts";
import { createShard } from "../shard/createShard.ts";
import { GatewayManager } from "./gatewayManager.ts";

let startedAt = performance.now();
/** Allows users to hook in and change to communicate to different workers across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellWorkerToIdentify(
  manager: GatewayManager,
  _workerId: number,
  shardId: number,
  _bucketId: number,
) {
  return await manager.manager.identify(shardId);

  // let shard = manager.shards.get(shardId);
  // if (!shard) {
  //   shard = manager.createShard({
  //     ...manager.createShardOptions,
  //     id: shardId,
  //     gatewayConfig: manager.gatewayConfig,
  //     totalShards: manager.totalShards,
  //     requestIdentify: async function () {
  //       return await bucket.leak.acquire(1);
  //     },
  //   });

  //   manager.shards.set(shardId, shard);
  // }

  // return await shard.identify();
}
