import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export function handleGuildLoaded(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;

  const guild = bot.transformers.guild(bot, { guild: payload, shardId });
  bot.events.guildLoaded(bot, guild);
}
