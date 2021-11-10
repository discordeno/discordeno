import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildRoleDelete } from "../../types/guilds/guild_role_delete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleDelete>;
  bot.events.roleDelete(bot, {
    roleId: bot.transformers.snowflake(payload.role_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
