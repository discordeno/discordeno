import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { UnavailableGuild } from "../../types/guilds/unavailable_guild.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { ws } from "../../ws/ws.ts";

export async function handleGuildDelete(data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as UnavailableGuild;

  const guild = await cacheHandlers.get("guilds", snowflakeToBigint(payload.id));
  if (!guild) return;

  await cacheHandlers.delete("guilds", guild.id);

  if (payload.unavailable) {
    const shard = ws.shards.get(shardId);
    if (shard) shard.unavailableGuildIds.add(guild.id);
    await cacheHandlers.set("unavailableGuilds", guild.id, Date.now());

    eventHandlers.guildUnavailable?.(guild);
  } else {
    eventHandlers.guildDelete?.(guild);
  }

  await Promise.all([
    cacheHandlers.forEach("DELETE_MESSAGES_FROM_GUILD", { guildId: guild.id }),
    cacheHandlers.forEach("DELETE_CHANNELS_FROM_GUILD", { guildId: guild.id }),
    cacheHandlers.forEach("DELETE_GUILD_FROM_MEMBER", { guildId: guild.id }),
  ]);
}
