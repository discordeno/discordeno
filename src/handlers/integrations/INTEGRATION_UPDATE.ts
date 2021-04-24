import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  IntegrationCreateUpdate,
} from "../../types/integration/integration_create_update.ts";

export function handleIntegrationUpdate(data: DiscordGatewayPayload) {
  eventHandlers.integrationUpdate?.(
    data.d as IntegrationCreateUpdate,
  );
}
