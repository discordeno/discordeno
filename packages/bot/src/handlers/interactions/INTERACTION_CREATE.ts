import type { DiscordGatewayPayload, DiscordInteraction } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.interactionCreate) return;

  const payload = data.d as DiscordInteraction;

  bot.events.interactionCreate(bot.transformers.interaction(bot, payload, { shardId }));
}
