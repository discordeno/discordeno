import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildIntegrationsUpdate } from "../../types/integrations/guild_integrations_update.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildIntegrationsUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildIntegrationsUpdate>;

  bot.events.integrationUpdate(bot, { guildId: bot.transformers.snowflake(payload.guild_id) });
}
