import { eventHandlers } from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway.ts";
import { basicShards } from "../../ws/shard.ts";

export async function handleGuildCreate(
  data: DiscordGatewayPayload,
  shardID: number,
) {
  const payload = data.d as DiscordGuild;
  // When shards resume they emit GUILD_CREATE again.
  if (await cacheHandlers.has("guilds", payload.id)) return;

  const guildStruct = await structures.createGuildStruct(
    data.d,
    shardID,
  );
  await cacheHandlers.set("guilds", guildStruct.id, guildStruct);

  const shard = basicShards.get(shardID);

  if (shard?.unavailableGuildIDs.has(payload.id)) {
    await cacheHandlers.delete("unavailableGuilds", payload.id);

    shard.unavailableGuildIDs.delete(payload.id);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guildStruct);
  eventHandlers.guildCreate?.(guildStruct);
}
