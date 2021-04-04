import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleGuildRoleCreate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildRoleCreateUpdate;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const role = await structures.createRoleStruct(payload.role);
  guild.roles = guild.roles.set(payload.role.id, role);
  await cacheHandlers.set("guilds", payload.guild_id, guild);

  eventHandlers.roleCreate?.(guild, role);
}
