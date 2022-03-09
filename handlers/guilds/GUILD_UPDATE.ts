import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordGuild;

  bot.events.guildUpdate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
