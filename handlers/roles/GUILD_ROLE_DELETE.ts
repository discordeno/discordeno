import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildRoleDelete } from "../../types/discord.ts";

export async function handleGuildRoleDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildRoleDelete;
  bot.events.roleDelete(bot, {
    roleId: bot.transformers.snowflake(payload.role_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
