import { eventHandlers } from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { basicShards } from "../../ws/shard.ts";

export async function handleGuildCreate(
  data: DiscordPayload,
  shardId: number,
) {
  const payload = data.d as DiscordGuild;
  // When shards resume they emit GUILD_CREATE again.
  if (await cacheHandlers.has("guilds", payload.id)) return;

  const guildStruct = await structures.createGuildStruct(
    data.d as CreateGuildPayload,
    shardId,
  );
  await cacheHandlers.set("guilds", guildStruct.id, guildStruct);

  const shard = basicShards.get(shardId);

  if (shard?.unavailableGuildIds.has(payload.id)) {
    await cacheHandlers.delete("unavailableGuilds", payload.id);

    shard.unavailableGuildIds.delete(payload.id);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guildStruct);
  eventHandlers.guildCreate?.(guildStruct);
}
