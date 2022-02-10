import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { IntegrationCreateUpdate } from "../../types/integrations/integrationCreateUpdate.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleIntegrationUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationUpdate(
    bot,
    bot.transformers.integration(bot, data.d as SnakeCasedPropertiesDeep<IntegrationCreateUpdate>),
  );
}
