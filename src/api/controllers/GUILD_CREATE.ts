import { eventHandlers } from "../../bot.ts";
import { CreateGuildPayload, DiscordPayload } from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleGuildCreate(
  data: DiscordPayload,
  shardID: number,
) {
  const payload = data.d as CreateGuildPayload;
  // When shards resume they emit GUILD_CREATE again.
  if (await cacheHandlers.has("guilds", payload.id)) return;

  const guildStruct = await structures.createGuildStruct(
    data.d as CreateGuildPayload,
    shardID,
  );
  await cacheHandlers.set("guilds", guildStruct.id, guildStruct);

  if (await cacheHandlers.has("unavailableGuilds", payload.id)) {
    await cacheHandlers.delete("unavailableGuilds", payload.id);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guildStruct);
  eventHandlers.guildCreate?.(guildStruct);
}
