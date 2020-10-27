import { eventHandlers } from "../module/client.ts";
import { structures } from "../structures/mod.ts";
import type { DiscordPayload } from "../types/discord.ts";
import type {
  GuildRoleDeletePayload,
  GuildRolePayload,
} from "../types/guild.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildRoleCreate(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_CREATE") return;

  const payload = data.d as GuildRolePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const role = await structures.createRole(payload.role);
  const roles = guild.roles.set(payload.role.id, role);
  guild.roles = roles;
  return eventHandlers.roleCreate?.(guild, role);
}

export async function handleInternalGuildRoleDelete(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_DELETE") return;

  const payload = data.d as GuildRoleDeletePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role_id)!;
  guild.roles.delete(payload.role_id);
  eventHandlers.roleDelete?.(guild, cachedRole);

  // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
  guild.members.forEach((member) => {
    member.roles = member.roles.filter((id) => id !== payload.role_id);
  });
}

export async function handleInternalGuildRoleUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_ROLE_UPDATE") return;

  const payload = data.d as GuildRolePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role.id);
  if (!cachedRole) return;

  const role = await structures.createRole(payload.role);
  guild.roles.set(payload.role.id, role);
  eventHandlers.roleUpdate?.(guild, role, cachedRole);
}
