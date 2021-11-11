import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { IntegrationCreateUpdate } from "../../types/integrations/integration_create_update.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleIntegrationCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationCreate(
    bot,
    bot.transformers.integration(bot, data.d as SnakeCasedPropertiesDeep<IntegrationCreateUpdate>)
  );
}
