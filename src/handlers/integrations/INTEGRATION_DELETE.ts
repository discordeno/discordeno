import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { IntegrationDelete } from "../../types/integration/integration_delete.ts";

export function handleIntegrationDelete(data: DiscordGatewayPayload) {
  eventHandlers.integrationDelete?.(
    data.d as IntegrationDelete,
  );
}
