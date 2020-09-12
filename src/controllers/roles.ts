import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import { DiscordPayload } from "../types/discord.ts";
import { GuildRoleDeletePayload, GuildRolePayload } from "../types/guild.ts";
import { cache } from "../utils/cache.ts";

export function handleInternalGuildRoleCreate(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_CREATE") return;

  const payload = data.d as GuildRolePayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const role = structures.createRole(payload.role);
  const roles = guild.roles.set(payload.role.id, role);
  guild.roles = roles;
  return eventHandlers.roleCreate?.(guild, role);
}

export function handleInternalGuildRoleDelete(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_DELETE") return;

  const payload = data.d as GuildRoleDeletePayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role_id)!;
  guild.roles.delete(payload.role_id);
  eventHandlers.roleDelete?.(guild, cachedRole);
}

export function handleInternalGuildRoleUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_UPDATE") return;

  const payload = data.d as GuildRolePayload;
  const guild = cache.guilds.get(payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role.id);
  if (!cachedRole) return;

  const role = structures.createRole(payload.role);
  eventHandlers.roleUpdate?.(guild, role, cachedRole);
}
