import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { IntegrationDelete } from "../../types/integrations/integrationDelete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleIntegrationDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<IntegrationDelete>;

  bot.events.integrationDelete(bot, {
    id: bot.transformers.snowflake(payload.id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
  });
}
