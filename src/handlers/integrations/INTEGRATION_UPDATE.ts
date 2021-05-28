import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { IntegrationCreateUpdate } from "../../types/integrations/integration_create_update.ts";

export function handleIntegrationUpdate(data: DiscordGatewayPayload) {
  eventHandlers.integrationUpdate?.(data.d as IntegrationCreateUpdate);
}
