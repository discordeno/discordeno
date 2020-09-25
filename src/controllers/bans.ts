import type { DiscordPayload } from "../types/discord.ts";
import type { GuildBanPayload } from "../types/guild.ts";

import { eventHandlers } from "../module/client.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildBanAdd(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = guild.members.get(payload.user.id);
  eventHandlers.guildBanAdd?.(guild, member || payload.user);
}

export async function handleInternalGuildBanRemove(data: DiscordPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = guild.members.get(payload.user.id);
  eventHandlers.guildBanRemove?.(guild, member || payload.user);
}
