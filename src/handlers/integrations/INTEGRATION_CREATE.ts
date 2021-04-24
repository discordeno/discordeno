import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  IntegrationCreateUpdate,
} from "../../types/integration/integration_create_update.ts";

export function handleIntegrationCreate(
  data: DiscordGatewayPayload,
) {
  eventHandlers.integrationCreate?.(
    data.d as IntegrationCreateUpdate,
  );
}
