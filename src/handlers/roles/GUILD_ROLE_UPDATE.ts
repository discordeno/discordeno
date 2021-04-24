import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { GuildRoleUpdate } from "../../types/mod.ts";

export async function handleGuildRoleUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as GuildRoleUpdate;
  const guild = await cacheHandlers.get("guilds", payload.guildId);
  if (!guild) return;

  const cachedRole = guild.roles.get(payload.role.id);
  if (!cachedRole) return;

  const role = await structures.createDiscordenoRole(payload);
  guild.roles.set(payload.role.id, role);
  await cacheHandlers.set("guilds", guild.id, guild);

  eventHandlers.roleUpdate?.(guild, role, cachedRole);
}
