import { loopObject } from "../util/loop_object.ts";
import { delay } from "../util/utils.ts";
import { GatewayManager } from "../bot.ts";

export async function processQueue(gateway: GatewayManager, id: number) {
  const shard = gateway.shards.get(id);
  // If no items or its already processing then exit
  if (!shard?.queue.length || shard.processingQueue) return;

  shard.processingQueue = true;

  while (shard.queue.length) {
    if (shard.gateway.readyState !== WebSocket.OPEN) {
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
    if (!request) return;

    if (request?.d) {
      request.d = loopObject(
        request.d as Record<string, unknown>,
        (value) =>
          typeof value === "bigint"
            ? value.toString()
            : Array.isArray(value)
            ? value.map((v) => (typeof v === "bigint" ? v.toString() : v))
            : value,
        `Running forEach loop in gateway.processQueue function for changing bigints to strings.`
      );
    }

    gateway.log("RAW_SEND", shard.id, request);

    shard.gateway.send(JSON.stringify(request));

    // Counter is useful for preventing 120/m requests.
    shard.queueCounter++;

    // Handle if the requests have been maxed
    if (shard.queueCounter >= 118) {
      gateway.log("DEBUG", {
        message: "Max gateway requests per minute reached setting timeout for one minute",
        shardId: shard.id,
      });
      await delay(60000);
      shard.queueCounter = 0;
      continue;
    }
  }

  shard.processingQueue = false;
}
