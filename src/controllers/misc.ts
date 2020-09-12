import { delay } from "https://deno.land/std@0.67.0/async/delay.ts";
import { eventHandlers, setBotID } from "../module/client.ts";
import { allowNextShard } from "../module/shardingManager.ts";
import { DiscordPayload, ReadyPayload } from "../types/discord.ts";
import { cache } from "../utils/cache.ts";

export async function handleInternalReady(data: DiscordPayload, shardID: number) {
  if (data.t !== "READY") return;

  const payload = data.d as ReadyPayload;
  setBotID(payload.user.id);

	// Triggered on each shard
  eventHandlers.shardReady?.(shardID);
  if (payload.shard && shardID === payload.shard[1] - 1) {
    // Wait 10 seconds to allow all guild create events to be processed
    await delay(10000);
    cache.isReady = true;
    eventHandlers.ready?.();
  }

	// Wait 5 seconds to spawn next shard
	await delay(5000);
	allowNextShard()
}
