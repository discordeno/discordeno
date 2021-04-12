import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordIntegrationCreateUpdate,
  IntegrationCreateUpdate,
} from "../../types/integration/integration_create_update.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleIntegrationUpdate(data: DiscordGatewayPayload) {
  eventHandlers.integrationUpdate?.(
    snakeKeysToCamelCase<IntegrationCreateUpdate>(
      data.d as DiscordIntegrationCreateUpdate,
    ),
  );
}
