import { cache } from "../utils/cache.ts";
import { DiscordPayload } from "../types/discord.ts";
import {
  CreateGuildPayload,
  GuildDeletePayload,
  GuildEmojisUpdatePayload,
  UpdateGuildPayload,
} from "../types/guild.ts";
import { structures } from "../structures/mod.ts";
import { eventHandlers } from "../module/client.ts";
import { GuildUpdateChange } from "../types/options.ts";

export function handleInternalGuildCreate(
  data: DiscordPayload,
  shardID: number,
) {
  if (data.t !== "GUILD_CREATE") return;

  const payload = data.d as CreateGuildPayload;
  // When shards resume they emit GUILD_CREATE again.
  if (cache.guilds.has(payload.id)) return;

  const guild = structures.createGuild(
    data.d as CreateGuildPayload,
    shardID,
  );

  cache.guilds.set(guild.id, guild);

  if (cache.unavailableGuilds.get(payload.id)) {
    cache.unavailableGuilds.delete(payload.id);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guild);
  return eventHandlers.guildCreate?.(guild);
}

export function handleInternalGuildDelete(data: DiscordPayload) {
  if (data.t !== "GUILD_CREATE") return;

  const payload = data.d as GuildDeletePayload;
  cache.messages.forEach((message) => {
    if (message.guildID === payload.id) cache.messages.delete(message.id);
  });
  cache.channels.forEach((channel) => {
    if (channel.guildID === payload.id) cache.channels.delete(channel.id);
  });
  cache.guilds.delete(payload.id);

  if (payload.unavailable) {
    return cache.unavailableGuilds.set(payload.id, Date.now());
  }

  const guild = cache.guilds.get(payload.id);
  if (!guild) return;
  return eventHandlers.guildDelete?.(guild);
}

export function handleInternalGuildUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_CREATE") return;

  const payload = data.d as UpdateGuildPayload;
  const cachedGuild = cache.guilds.get(payload.id);
  if (!cachedGuild) return;

  const keysToSkip = [
    "roles",
    "guild_hashes",
    "guild_id",
    "max_members",
    "emojis",
  ];

  const changes = Object.entries(payload)
    .map(([key, value]) => {
      if (keysToSkip.includes(key)) return;

      // @ts-ignore
      const cachedValue = cachedGuild[key];
      if (cachedValue !== value) {
        // Guild create sends undefined and update sends false.
        if (!cachedValue && !value) return;

        if (Array.isArray(cachedValue) && Array.isArray(value)) {
          const different = (cachedValue.length !== value.length) ||
            cachedValue.find((val) => !value.includes(val)) ||
            value.find((val) => !cachedValue.includes(val));
          if (!different) return;
        }

        // This will update the cached guild with the new values
        // @ts-ignore
        cachedGuild[key] = value;
        return { key, oldValue: cachedValue, value };
      }
      return;
    }).filter((change) => change) as GuildUpdateChange[];

  return eventHandlers.guildUpdate?.(cachedGuild, changes);
}

export function handleInternalGuildEmojisUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_EMOJIS_UPDATE") return;

  const payload = data.d as GuildEmojisUpdatePayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = payload.emojis;

  return eventHandlers.guildEmojisUpdate?.(
    guild,
    payload.emojis,
    cachedEmojis,
  );
}
