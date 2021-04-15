import { delay } from "../util/utils.ts";
import { ws } from "./ws.ts";

export async function processQueue(id: number) {
  const shard = ws.shards.get(id);
  // If no items or its already processing then exit
  if (!shard?.queue.length || shard.processingQueue) return;

  shard.processingQueue = true;

  while (shard.queue.length) {
    if (shard.ws.readyState !== WebSocket.OPEN) {
      shard.processingQueue = false;
      return;
    }

    const now = Date.now();
    if (now - shard.queueStartedAt >= 60000) {
      shard.queueStartedAt = now;
      shard.queueCounter = 0;
    }

    // Send a request that is next in line
    const request = shard.queue.shift();

    shard.ws.send(JSON.stringify(request));

    // Counter is useful for preventing 120/m requests.
    shard.queueCounter++;

    // Handle if the requests have been maxed
    if (shard.queueCounter >= 118) {
      await delay(60000);
      shard.queueCounter = 0;
      continue;
    }
  }

  shard.processingQueue = false;
}
