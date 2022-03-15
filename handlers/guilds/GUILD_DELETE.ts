import type { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordUnavailableGuild } from "../../types/discord.ts";

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordUnavailableGuild;
  bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId);
}
