import type { DiscordChannel, DiscordGatewayPayload } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleThreadCreate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.threadCreate) return;

  const payload = data.d as DiscordChannel;

  bot.events.threadCreate(bot.transformers.channel(bot, payload));
}
