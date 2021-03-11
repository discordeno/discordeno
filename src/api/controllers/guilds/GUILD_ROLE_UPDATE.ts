import { eventHandlers } from "../../../bot.ts";
import {
  DiscordPayload,
  GuildRoleDeletePayload,
  GuildRolePayload,
} from "../../../types/mod.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../../cache.ts";

export async function handleGuildRoleUpdate(data: DiscordPayload) {
  const payload = data.d as GuildRolePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role.id);
  if (!cachedRole) return;

  const role = await structures.createRoleStruct(payload.role);
  guild.roles.set(payload.role.id, role);
  await cacheHandlers.set("guilds", guild.id, guild);

  eventHandlers.roleUpdate?.(guild, role, cachedRole);
}
