import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildRoleUpdate } from "../../types/guilds/guildRoleUpdate.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildRoleUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildRoleUpdate>;

  bot.events.roleUpdate(
    bot,
    bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) })
  );
}
