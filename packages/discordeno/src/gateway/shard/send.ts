import { Shard, ShardSocketRequest } from "./types.js";

async function checkOffline(shard: Shard, highPriority: boolean): Promise<void> {
  if (!shard.isOpen()) {
    await new Promise((resolve) => {
      if (highPriority) {
        // Higher priority requests get added at the beginning of the array.
        shard.offlineSendQueue.unshift(resolve);
      } else {
        shard.offlineSendQueue.push(resolve);
      }
    });
  }
}

export async function send(shard: Shard, message: ShardSocketRequest, highPriority: boolean): Promise<void> {
  // Before acquiring a token from the bucket, check whether the shard is currently offline or not.
  // Else bucket and token wait time just get wasted.
  await checkOffline(shard, highPriority);

  await shard.bucket.acquire(1, highPriority);

  // It's possible, that the shard went offline after a token has been acquired from the bucket.
  await checkOffline(shard, highPriority);

  shard.socket?.send(JSON.stringify(message));
}
