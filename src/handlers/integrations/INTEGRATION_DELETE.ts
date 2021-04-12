import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { IntegrationCreateUpdate } from "../../types/integration/integration_create_update.ts";
import {
  DiscordIntegrationDelete,
} from "../../types/integration/integration_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleIntegrationDelete(data: DiscordGatewayPayload) {
  eventHandlers.integrationDelete?.(
    snakeKeysToCamelCase<IntegrationCreateUpdate>(
      data.d as DiscordIntegrationDelete,
    ),
  );
}
