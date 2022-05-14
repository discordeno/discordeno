import type { Bot } from "../../bot.ts";
import type { Guild } from "../../transformers/guild.ts";
import { DiscordGatewayPayload, DiscordGuildCreate } from "../../types/discord.ts";

export function handleGuildCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuildCreate;
  bot.events.guildCreate(bot, bot.transformers.guildCreate(bot, { guild: payload, shardId }) as Guild);
}
