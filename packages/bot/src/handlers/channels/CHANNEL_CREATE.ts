import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleChannelCreate(bot: Bot, payload: DiscordGatewayPayload, _shardId: number): Promise<void> {
  if (!bot.events.channelCreate) return;

  const data = payload.d as DiscordChannel;
  const channel = bot.transformers.channel(bot, data, { guildId: data.guild_id });

  bot.events.channelCreate(channel);
}
