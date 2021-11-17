import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildRoleDelete } from "../../types/guilds/guildRoleDelete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleDelete>;
  bot.events.roleDelete(bot, {
    roleId: bot.transformers.snowflake(payload.role_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
