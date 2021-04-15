import { closeWS } from "./close_ws.ts";
import { ws } from "./ws.ts";

/** Allows users to hook in and change to communicate to different clusters across different servers or anything they like. For example using redis pubsub to talk to other servers. */
export async function tellClusterToIdentify(
  _workerId: number,
  shardId: number,
  _bucketId: number,
) {
  // When resharding this may exist already
  const oldShard = ws.shards.get(shardId);
  await ws.identify(shardId, ws.maxShards);

  if (oldShard) {
    closeWS(oldShard.ws, 3063, "Resharded!");
  }
}
