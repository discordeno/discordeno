import { eventHandlers, setApplicationId, setBotId } from "../../bot.ts";
import { cache } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Ready } from "../../types/gateway/ready.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { ws } from "../../ws/ws.ts";

export function handleReady(
  data: DiscordGatewayPayload,
  shardId: number,
) {
  // The bot has already started, the last shard is resumed, however.
  if (cache.isReady) return;

  const payload = data.d as Ready;
  setBotId(payload.user.id);
  setApplicationId(payload.application.id);

  // Triggered on each shard
  eventHandlers.shardReady?.(shardId);
  // Save when the READY event was received to prevent infinite load loops
  const now = Date.now();

  const shard = ws.shards.get(shardId);
  if (!shard) return;

  // Set ready to false just to go sure
  shard.ready = false;
  // All guilds are unavailable at first
  shard.unavailableGuildIds = new Set(
    payload.guilds.map((g) => snowflakeToBigint(g.id)),
  );

  // Start ready check in 2 seconds
  setTimeout(() => {
    eventHandlers.debug?.(
      "loop",
      `1. Running setTimeout in READY file.`,
    );
    checkReady(payload, shardId, now);
  }, 2000);
}

// Don't pass the shard itself because unavailableGuilds won't be updated by the GUILD_CREATE event
/** This function checks if the shard is fully loaded */
function checkReady(payload: Ready, shardId: number, now: number) {
  const shard = ws.shards.get(shardId);
  if (!shard) return;

  // Check if all guilds were loaded
  if (shard.unavailableGuildIds.size) {
    if (Date.now() - now > 10000) {
      eventHandlers.shardFailedToLoad?.(shardId, shard.unavailableGuildIds);
      // Force execute the loaded function to prevent infinite loop
      loaded(shardId);
    } else {
      // Not all guilds were loaded but 10 seconds haven't passed so check again
      setTimeout(() => {
        eventHandlers.debug?.(
          "loop",
          `2. Running setTimeout in READY file.`,
        );
        checkReady(payload, shardId, now);
      }, 2000);
    }
  } else {
    // All guilds were loaded
    loaded(shardId);
  }
}

function loaded(shardId: number) {
  const shard = ws.shards.get(shardId);
  if (!shard) return;

  shard.ready = true;

  // If it is the last shard we can go full ready
  if (shardId === ws.maxShards - 1) {
    // Still some shards are loading so wait another 2 seconds for them
    if (ws.shards.some((shard) => !shard.ready)) {
      setTimeout(() => {
        eventHandlers.debug?.(
          "loop",
          `3. Running setTimeout in READY file.`,
        );
        loaded(shardId);
      }, 2000);
    } else {
      cache.isReady = true;
      eventHandlers.ready?.();
    }
  }
}
