import { eventHandlers, setApplicationId, setBotId } from "../../bot.ts";
import { cache } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Ready } from "../../types/gateway/ready.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { DiscordenoShard, ws } from "../../ws/ws.ts";

export function handleReady(data: DiscordGatewayPayload, shardId: number) {
  // Triggered on each shard
  eventHandlers.shardReady?.(shardId);

  // The bot has already started, the last shard is resumed, however.
  if (cache.isReady) return;

  const shard = ws.shards.get(shardId);
  if (!shard) return;

  const payload = data.d as Ready;
  setBotId(payload.user.id);
  setApplicationId(payload.application.id);

  // Set ready to false just to go sure
  shard.ready = false;
  // All guilds are unavailable at first
  shard.unavailableGuildIds = new Set(payload.guilds.map((g) => snowflakeToBigint(g.id)));

  // Failed to load check
  shard.failedToLoadTimeoutId = setTimeout(() => {
    eventHandlers.shardFailedToLoad?.(shard.id, shard.unavailableGuildIds);
    // Force executes the loaded function to prevent infinite loop
    return loaded(shard);
  }, 5000);
}

export function guildAvailable(shard: DiscordenoShard, guildId: bigint) {
  if (!shard.failedToLoadTimeoutId) return;

  clearTimeout(shard.failedToLoadTimeoutId);
  shard.unavailableGuildIds.delete(guildId);
  if (!shard.unavailableGuildIds.size) return loaded(shard);

  shard.failedToLoadTimeoutId = setTimeout(() => {
    eventHandlers.shardFailedToLoad?.(shard.id, shard.unavailableGuildIds);
    // Force execute the loaded function to prevent infinite loop
    return loaded(shard);
  }, 5000);
}

function loaded(shard: DiscordenoShard) {
  shard.ready = true;

  // If it is not the last shard we can't go full ready
  if (shard.id !== ws.lastShardId) return;

  // Still some shards are loading so wait another 2 seconds for them
  if (ws.shards.some((shard) => !shard.ready)) {
    setTimeout(() => {
      eventHandlers.debug?.("loop", `3. Running setTimeout in READY file.`);
      loaded(shard);
    }, 2000);

    return;
  }

  cache.isReady = true;
  eventHandlers.ready?.();
}
