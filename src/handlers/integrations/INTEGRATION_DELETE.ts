import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { IntegrationDelete } from "../../types/integrations/integration_delete.ts";

export function handleIntegrationDelete(data: DiscordGatewayPayload) {
  eventHandlers.integrationDelete?.(data.d as IntegrationDelete);
}
