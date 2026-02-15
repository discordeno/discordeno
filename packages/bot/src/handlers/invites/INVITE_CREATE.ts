import type { DiscordGatewayPayload, DiscordInviteCreate } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  if (!bot.events.inviteCreate) return;

  const payload = data.d as DiscordInviteCreate;

  // TODO: Add role_ids, the transformer should be kept for the Invite type, not for the gateway event
  bot.events.inviteCreate(bot.transformers.invite(bot, payload, { shardId }));
}
