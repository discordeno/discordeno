import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordIntegrationCreateUpdate,
  IntegrationCreateUpdate,
} from "../../types/integration/integration_create_update.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleIntegrationCreate(
  data: DiscordGatewayPayload,
) {
  eventHandlers.integrationCreate?.(
    snakeKeysToCamelCase<IntegrationCreateUpdate>(
      data.d as DiscordIntegrationCreateUpdate,
    ),
  );
}
