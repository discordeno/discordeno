import type { Bot } from "../../bot.ts";
import type { Guild } from "../../transformers/guild.ts";
import { DiscordGatewayPayload, DiscordGuild } from "../../types/discord.ts";

export function handleGuildLoaded(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;

  const guild = bot.transformers.guild(bot, { guild: payload, shardId });
  bot.events.guildLoaded(bot, guild as Guild);
}
