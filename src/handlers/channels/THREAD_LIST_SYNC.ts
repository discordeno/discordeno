import { Bot } from "../../bot.ts";
import { ThreadListSync } from "../../types/channels/threads/threadListSync.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleThreadListSync(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<ThreadListSync>;

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
