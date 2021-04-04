import { ws } from "./ws.ts";

/** Allows users to hook in and change to communicate to different clusters across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellClusterToIdentify(
  workerID: number,
  shardID: number,
  bucketID: number,
) {
  // When resharding this may exist already
  const oldShard = ws.shards.get(shardID);

  // TODO: Use workers
  await ws.identify(shardID, ws.maxShards);

  if (oldShard) {
    oldShard.ws.close(4009, "Resharded!");
  }
}
