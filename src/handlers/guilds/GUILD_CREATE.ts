import { eventHandlers } from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { Guild } from "../../types/guilds/guild.ts";
import { ws } from "../../ws/ws.ts";

export async function handleGuildCreate(
  data: DiscordGatewayPayload,
  shardId: number,
) {
  const payload = data.d as Guild;
  // When shards resume they emit GUILD_CREATE again.
  if (await cacheHandlers.has("guilds", payload.id)) return;

  const discordenoGuild = await structures.createDiscordenoGuild(
    payload,
    shardId,
  );
  await cacheHandlers.set("guilds", discordenoGuild.id, discordenoGuild);

  const shard = ws.shards.get(shardId);

  if (shard?.unavailableGuildIds.has(payload.id)) {
    await cacheHandlers.delete("unavailableGuilds", payload.id);

    shard.unavailableGuildIds.delete(payload.id);

    return eventHandlers.guildAvailable?.(discordenoGuild);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(discordenoGuild);
  eventHandlers.guildCreate?.(discordenoGuild);
}
