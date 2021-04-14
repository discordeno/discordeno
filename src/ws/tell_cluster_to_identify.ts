import { ws } from "./ws.ts";

/** Allows users to hook in and change to communicate to different clusters across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellClusterToIdentify(
  workerId: number,
  shardId: number,
  bucketId: number,
) {
  // When resharding this may exist already
  const oldShard = ws.shards.get(shardId);
  await ws.identify(shardId, ws.maxShards);

  if (oldShard) {
    oldShard.ws.close(3065, "Resharded!");
  }
}
