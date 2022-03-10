import type { Bot } from "../../bot.ts";
import { DiscordGuildIntegrationsUpdate } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleGuildIntegrationsUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildIntegrationsUpdate;

  bot.events.integrationUpdate(bot, { guildId: bot.transformers.snowflake(payload.guild_id) });
}
