import type { DiscordGatewayPayload, DiscordVoiceChannelStartTimeUpdate } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleVoiceChannelStartTimeUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.voiceChannelStartTimeUpdate) return;

  const payload = data.d as DiscordVoiceChannelStartTimeUpdate;

  bot.events.voiceChannelStartTimeUpdate({
    guildId: bot.transformers.snowflake(payload.guild_id),
    id: bot.transformers.snowflake(payload.id),
    voiceStartTime: payload.voice_start_time ?? undefined,
  });
}
