import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { IntegrationCreateUpdate } from "../../types/integrations/integration_create_update.ts";

export function handleIntegrationCreate(data: DiscordGatewayPayload) {
  eventHandlers.integrationCreate?.(data.d as IntegrationCreateUpdate);
}
