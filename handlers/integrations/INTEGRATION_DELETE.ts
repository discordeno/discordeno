import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordIntegrationDelete } from "../../types/discord.ts";

export function handleIntegrationDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordIntegrationDelete;

  bot.events.integrationDelete(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
  });
}
