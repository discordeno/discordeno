import type { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuild } from "../../types/discord.ts";

export async function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;

  bot.events.guildUpdate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
