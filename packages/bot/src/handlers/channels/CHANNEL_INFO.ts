import type { DiscordChannelInfo, DiscordGatewayPayload } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleChannelInfo(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.channelInfo) return;

  const payload = data.d as DiscordChannelInfo;

  bot.events.channelInfo(bot.transformers.channelInfo(bot, payload));
}
