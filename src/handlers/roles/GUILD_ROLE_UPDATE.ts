import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildRoleUpdate } from "../../types/guilds/guild_role_update.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleUpdate>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const guild = await bot.cache.guilds.get(guildId);
  if (!guild) return;

  const role = bot.transformers.role(bot, { role: payload.role, guildId });
  guild.roles = guild.roles.set(role.id, role);
  await bot.cache.guilds.set(guild.id, guild);

  bot.events.roleUpdate(bot, guild, role, guild.roles.get(role.id));
}
