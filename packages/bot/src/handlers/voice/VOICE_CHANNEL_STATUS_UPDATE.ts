import type { DiscordGatewayPayload, DiscordVoiceChannelStatusUpdate } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleVoiceChannelStatusUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceChannelStatusUpdate) return;

  const payload = data.d as DiscordVoiceChannelStatusUpdate;

  bot.events.voiceChannelStatusUpdate({
    guildId: bot.transformers.snowflake(payload.guild_id),
    id: bot.transformers.snowflake(payload.id),
    status: payload.status ?? undefined,
  });
}
