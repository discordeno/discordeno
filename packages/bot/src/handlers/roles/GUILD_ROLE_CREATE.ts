import type { DiscordGatewayPayload, DiscordGuildRoleCreate } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleGuildRoleCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.roleCreate) return;

  const payload = data.d as DiscordGuildRoleCreate;
  bot.events.roleCreate(
    bot.transformers.role(bot, payload.role, {
      guildId: bot.transformers.snowflake(payload.guild_id),
    }),
  );
}
