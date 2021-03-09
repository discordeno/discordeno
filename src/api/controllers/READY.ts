import {
  eventHandlers,
  lastShardID,
  setApplicationID,
  setBotID,
} from "../../bot.ts";
import { DiscordPayload, ReadyPayload } from "../../types/discord.ts";
import { cache } from "../../util/cache.ts";
import { delay } from "../../util/utils.ts";
import { allowNextShard } from "../../ws/mod.ts";
import { initialMemberLoadQueue } from "../structures/guild.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

const loadingShards = new Set<number>();
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

  loadingShards.add(shardID);
  async function checkReady() {
    async function guildsMissing() {
      const missingGuildIDs = new Set<string>();
      for (const g of payload.guilds) {
        if (!(await cacheHandlers.has("guilds", g.id))) {
          missingGuildIDs.add(g.id);
        }
      }

      if (missingGuildIDs.size) {
        payload.guilds = payload.guilds.filter((unavailableGuild) =>
          !missingGuildIDs.has(unavailableGuild.id)
        );

        return true;
      }

      return false;
    }

    async function loaded() {
      loadingShards.delete(shardID);

      // The bot has already started, the last shard is resumed, however.
      if (cache.isReady) return;

      if (shardID === lastShardID - 1) {
        if (loadingShards.size) {
          setTimeout(loaded, 2000);
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

    if (await guildsMissing()) {
      if (Date.now() - now > 10000) {
        loadingShards.delete(shardID);
        eventHandlers.shardFailedToLoad?.(shardID, payload.guilds);
        loaded();
      } else {
        setTimeout(checkReady, 2000);
      }
    } else {
      loaded();
    }
  }

  setTimeout(checkReady, 2000);

  // Wait 5 seconds to spawn next shard
  await delay(5000);
  allowNextShard();
}
