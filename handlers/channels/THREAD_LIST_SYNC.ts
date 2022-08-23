import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordThreadListSync } from "../../types/discord.ts";

export async function handleThreadListSync(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordThreadListSync;

  const guildId = bot.transformers.snowflake(payload.guild_id);
  return {
    guildId,
    channelIds: payload.channel_ids?.map((id) => bot.transformers.snowflake(id)),
    threads: payload.threads.map((thread) => bot.transformers.channel(bot, { channel: thread, guildId })),
    members: payload.members.map((member) => ({
      id: member.id ? bot.transformers.snowflake(member.id) : undefined,
      userId: member.user_id ? bot.transformers.snowflake(member.user_id) : undefined,
      joinTimestamp: Date.parse(member.join_timestamp),
    })),
  };
}
