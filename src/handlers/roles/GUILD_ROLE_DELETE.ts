import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildRoleDelete } from "../../types/guilds/guild_role_delete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleDelete>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const guild = await bot.cache.guilds.get(guildId);
  if (!guild) return;

  const roleId = bot.transformers.snowflake(payload.role_id);

  const cachedRole = guild.roles.get(roleId);
  guild.roles.delete(roleId);

  await bot.cache.guilds.set(guild.id, guild);

  if (cachedRole) bot.events.roleDelete(bot, guild, cachedRole);

  // For bots without GUILD_MEMBERS member.roles is never updated breaking permissions checking.
  await bot.cache.execute("DELETE_ROLE_FROM_MEMBER", { guildId: guild.id, roleId });
}
