import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildRoleDelete } from "../../types/guilds/guild_role_delete.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleGuildRoleDelete(data: DiscordGatewayPayload) {
  const payload = data.d as GuildRoleDelete;
  const guild = await cacheHandlers.get("guilds", snowflakeToBigint(payload.guildId));
  if (!guild) return;

  const roleId = snowflakeToBigint(payload.roleId);

  const cachedRole = guild.roles.get(roleId)!;
  guild.roles.delete(roleId);

  if (cachedRole) eventHandlers.roleDelete?.(guild, cachedRole);

  // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
  await cacheHandlers.forEach("DELETE_ROLE_FROM_MEMBER", { guildId: guild.id, roleId });
}
