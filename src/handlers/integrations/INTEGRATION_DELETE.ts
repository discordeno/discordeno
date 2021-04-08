import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordIntegrationDelete,
  IntegrationDelete,
} from "../../types/integration/integration_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleIntegrationDelete(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordIntegrationDelete;

  eventHandlers.integrationDelete?.(
    snakeKeysToCamelCase(payload) as IntegrationDelete,
  );
}
