import type { DiscordGatewayPayload, DiscordThreadListSync } from '@discordeno/types';
import type { Bot } from '../../bot.js';

export async function handleThreadListSync(bot: Bot, data: DiscordGatewayPayload): Promise<any> {
  if (!bot.events.threadListSync) return;

  const payload = data.d as DiscordThreadListSync;

  const guildId = bot.transformers.snowflake(payload.guild_id);

  bot.events.threadListSync({
    guildId,
    channelIds: payload.channel_ids?.map((id) => bot.transformers.snowflake(id)),
    threads: payload.threads.map((thread) => bot.transformers.channel(bot, thread, { guildId })),
    members: payload.members.map((member) => bot.transformers.threadMember(bot, member, { guildId: payload.guild_id })),
  });
}
