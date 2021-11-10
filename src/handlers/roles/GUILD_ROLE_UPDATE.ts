import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildRoleUpdate } from "../../types/guilds/guild_role_update.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleUpdate>;

  bot.events.roleUpdate(
    bot,
    bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) })
  );
}
