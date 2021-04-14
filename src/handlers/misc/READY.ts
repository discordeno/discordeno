import { eventHandlers, setApplicationId, setBotId } from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { initialMemberLoadQueue } from "../../structures/guild.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordReady } from "../../types/gateway/ready.ts";
import { DiscordGuildMemberWithUser } from "../../types/mod.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";
import { ws } from "../../ws/ws.ts";

export function handleReady(
  data: DiscordGatewayPayload,
  shardId: number,
) {
  // The bot has already started, the last shard is resumed, however.
  if (cache.isReady) return;

  const payload = data.d as DiscordReady;
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
  shard.unavailableGuildIds = new Set(payload.guilds.map((g) => g.id));

  // Start ready check in 2 seconds
  setTimeout(async () => {
    eventHandlers.debug?.(
      "loop",
      `1. Running setTimeout in READY file.`,
    );
    await checkReady(payload, shardId, now);
  }, 2000);
}

// Don't pass the shard itself because unavailableGuilds won't be updated by the GUILD_CREATE event
/** This function checks if the shard is fully loaded */
async function checkReady(payload: DiscordReady, shardId: number, now: number) {
  const shard = ws.shards.get(shardId);
  if (!shard) return;

  // Check if all guilds were loaded
  if (shard.unavailableGuildIds.size) {
    if (Date.now() - now > 10000) {
      eventHandlers.shardFailedToLoad?.(shardId, shard.unavailableGuildIds);
      // Force execute the loaded function to prevent infinite loop
      await loaded(shardId);
    } else {
      // Not all guilds were loaded but 10 seconds haven't passed so check again
      setTimeout(async () => {
        eventHandlers.debug?.(
          "loop",
          `2. Running setTimeout in READY file.`,
        );
        await checkReady(payload, shardId, now);
      }, 2000);
    }
  } else {
    // All guilds were loaded
    await loaded(shardId);
  }
}

async function loaded(shardId: number) {
  const shard = ws.shards.get(shardId);
  if (!shard) return;

  shard.ready = true;

  // If it is the last shard we can go full ready
  if (shardId === ws.lastShardId - 1) {
    // Still some shards are loading so wait another 2 seconds for them
    if (ws.shards.some((shard) => !shard.ready)) {
      setTimeout(async () => {
        eventHandlers.debug?.(
          "loop",
          `3. Running setTimeout in CHANNEL_DELTE file.`,
        );
        await loaded(shardId);
      }, 2000);
    } else {
      cache.isReady = true;
      eventHandlers.ready?.();

      // All the members that came in on guild creates should now be processed 1 by 1
      for (const [guildId, members] of initialMemberLoadQueue.entries()) {
        eventHandlers.debug?.(
          "loop",
          "Running for of loop in READY file for loading members.",
        );
        await Promise.allSettled(
          members.map(async (member) => {
            const discordenoMember = await structures.createDiscordenoMember(
              camelKeysToSnakeCase<DiscordGuildMemberWithUser>(member),
              guildId,
            );

            return cacheHandlers.set(
              "members",
              discordenoMember.id,
              discordenoMember,
            );
          }),
        );
      }
    }
  }
}
