import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordThreadMemberUpdate } from "../../types/discord.ts";

export async function handleThreadMemberUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordThreadMemberUpdate;

  bot.events.threadMemberUpdate(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    joinedAt: Date.parse(payload.joined_at),
    flags: payload.flags,
  });
}
