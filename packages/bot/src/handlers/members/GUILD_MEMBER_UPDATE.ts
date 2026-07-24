import type { DiscordGatewayPayload, DiscordGuildMemberUpdate } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildMemberUpdate) return;

  const payload = data.d as DiscordGuildMemberUpdate;

  const user = bot.transformers.user(bot, payload.user);
  bot.events.guildMemberUpdate(bot.transformers.member(bot, payload, { guildId: payload.guild_id, userId: payload.user.id, partial: true }), user);
}
