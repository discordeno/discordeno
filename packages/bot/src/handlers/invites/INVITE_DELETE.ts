import type { DiscordGatewayPayload, DiscordInviteDelete } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleInviteDelete(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.inviteDelete) return;

  const payload = data.d as DiscordInviteDelete;

  bot.events.inviteDelete({
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    code: payload.code,
  });
}
