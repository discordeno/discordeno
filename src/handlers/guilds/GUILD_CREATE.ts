import { eventHandlers } from "../../bot.ts";
import { cache, cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { ws } from "../../ws/ws.ts";
import { guildAvailable } from "../misc/READY.ts";

export async function handleGuildCreate(data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as Guild;
  // When shards resume they emit GUILD_CREATE again.
  if (
    (await cacheHandlers.has("guilds", snowflakeToBigint(payload.id))) ||
    cache.dispatchedGuildIds.has(snowflakeToBigint(payload.id))
  )
    return;

  const guild = await structures.createDiscordenoGuild(payload, shardId);
  await cacheHandlers.set("guilds", guild.id, guild);

  const shard = ws.shards.get(shardId);

  if (shard?.unavailableGuildIds.has(guild.id)) {
    await cacheHandlers.delete("unavailableGuilds", guild.id);
    guildAvailable(shard, guild.id);

    return eventHandlers.guildAvailable?.(guild);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guild);
  eventHandlers.guildCreate?.(guild);
}
