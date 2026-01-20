import type { DiscordGatewayPayload, DiscordGuildMemberAdd } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleGuildMemberAdd(bot: Bot, data: DiscordGatewayPayload): Promise<void> {
  if (!bot.events.guildMemberAdd) return;

  const payload = data.d as DiscordGuildMemberAdd;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);
  const member = bot.transformers.member(bot, payload, { guildId, userId: payload.user.id });
  bot.events.guildMemberAdd(member, user);
}
