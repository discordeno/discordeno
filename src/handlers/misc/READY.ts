import {
  eventHandlers,
  lastShardID,
  setApplicationID,
  setBotID
} from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { initialMemberLoadQueue } from "../../structures/guild.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordPayload, ReadyPayload } from "../../types/discord.ts";
import { delay } from "../../util/utils.ts";
import { allowNextShard, basicShards } from "../../ws/mod.ts";

export async function handleReady(
  data: DiscordPayload,
  shardID: number,
) {
  // The bot has already started, the last shard is resumed, however.
  if (cache.isReady) return;

  const payload = data.d as ReadyPayload;
  setBotID(payload.user.id);
  setApplicationID(payload.application.id);

  // Triggered on each shard
  eventHandlers.shardReady?.(shardID);
  // Save when the READY event was received to prevent infinite load loops
  const now = Date.now();

  const shard = basicShards.get(shardID);
  if (!shard) return;

  // Set ready to false just to go sure
  shard.ready = false;
  // All guilds are unavailable at first
  shard.unavailableGuildIDs = new Set(payload.guilds.map((g) => g.id));

  // Start ready check in 2 seconds
  setTimeout(() => checkReady(payload, shardID, now), 2000);

  // Wait 5 seconds to spawn next shard
  await delay(5000);
  allowNextShard();
}

// Don't pass the shard itself because unavailableGuilds won't be updated by the GUILD_CREATE event
/** This function checks if the shard is fully loaded */
function checkReady(payload: ReadyPayload, shardID: number, now: number) {
  const shard = basicShards.get(shardID);
  if (!shard) return;

  // Check if all guilds were loaded
  if (shard.unavailableGuildIDs.size) {
    if (Date.now() - now > 10000) {
      eventHandlers.shardFailedToLoad?.(shardID, shard.unavailableGuildIDs);
      // Force execute the loaded function to prevent infinite loop
      loaded(shardID);
    } else {
      // Not all guilds were loaded but 10 seconds haven't passed so check again
      setTimeout(() => checkReady(payload, shardID, now), 2000);
    }
  } else {
    // All guilds were loaded
    loaded(shardID);
  }
}

async function loaded(shardID: number) {
  const shard = basicShards.get(shardID);
  if (!shard) return;

  shard.ready = true;

  // If it is the last shard we can go full ready
  if (shardID === lastShardID - 1) {
    // Still some shards are loading so wait another 2 seconds for them
    if (basicShards.some((shard) => !shard.ready)) {
      setTimeout(() => loaded(shardID), 2000);
    } else {
      cache.isReady = true;
      eventHandlers.ready?.();

      // All the members that came in on guild creates should now be processed 1 by 1
      for (const [guildID, members] of initialMemberLoadQueue.entries()) {
        await Promise.allSettled(
          members.map(async (member) => {
            const memberStruct = await structures.createMemberStruct(
              member,
              guildID,
            );

            return cacheHandlers.set(
              "members",
              memberStruct.id,
              memberStruct,
            );
          }),
        );
      }
    }
  }
}
