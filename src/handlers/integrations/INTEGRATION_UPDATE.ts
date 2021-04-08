import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordIntegrationCreateUpdate,
  IntegrationCreateUpdate,
} from "../../types/integration/integration_create_update.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleIntegrationUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordIntegrationCreateUpdate;

  eventHandlers.integrationUpdate?.(
    snakeKeysToCamelCase(payload) as IntegrationCreateUpdate,
  );
}
