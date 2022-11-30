import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildRoleCreate } from "../../types/discord.ts";

export async function handleGuildRoleCreate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildRoleCreate;
  bot.events.roleCreate(
    bot,
    bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) }),
  );
}
