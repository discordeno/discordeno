import {
  eventHandlers,
  lastShardID,
  setApplicationID,
  setBotID,
} from "../../bot.ts";
import { DiscordPayload, ReadyPayload } from "../../types/discord.ts";
import { cache } from "../../util/cache.ts";
import { delay } from "../../util/utils.ts";
import { allowNextShard, basicShards } from "../../ws/mod.ts";
import { initialMemberLoadQueue } from "../structures/guild.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

async function guildsMissing(guildIDs: Set<string>) {
  for (const id of guildIDs) {
    if (!await cacheHandlers.has("guilds", id)) return true;
  }

  return false;
}

async function loaded(shardID: number) {
  const shard = basicShards.get(shardID);
  if (!shard) return;

  shard.ready = true;

  // The bot has already started, the last shard is resumed, however.
  if (cache.isReady) return;

  if (shardID === lastShardID - 1) {
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

async function checkReady(payload: ReadyPayload, shardID: number, now: number) {
  const shard = basicShards.get(shardID);
  if (!shard) return;

  if (await guildsMissing(shard.unavailableGuildIDs)) {
    if (Date.now() - now > 10000) {
      shard.ready = true;
      eventHandlers.shardFailedToLoad?.(shardID, [
        ...shard.unavailableGuildIDs,
      ]);
      loaded(shardID);
    } else {
      setTimeout(() => checkReady(payload, shardID, now), 2000);
    }
  } else {
    loaded(shardID);
  }
}

/** This function is the internal handler for the ready event. Users can override this with controllers if desired. */
export async function handleInternalReady(
  data: DiscordPayload,
  shardID: number,
) {
  if (data.t !== "READY") return;

  const payload = data.d as ReadyPayload;
  setBotID(payload.user.id);
  setApplicationID(payload.application.id);

  // Triggered on each shard
  eventHandlers.shardReady?.(shardID);
  const now = Date.now();

  const shard = basicShards.get(shardID);
  if (!shard) return;

  shard.ready = false;
  payload.guilds.forEach(async (g) => shard.unavailableGuildIDs.add(g.id));

  setTimeout(() => checkReady(payload, shardID, now), 2000);

  // Wait 5 seconds to spawn next shard
  await delay(5000);
  allowNextShard();
}
