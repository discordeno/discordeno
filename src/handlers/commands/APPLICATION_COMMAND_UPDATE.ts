import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  ApplicationCommandCreateUpdateDelete,
  DiscordApplicationCommandCreateUpdateDelete,
} from "../../types/interactions/application_command_create_update_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleApplicationCommandUpdate(data: DiscordGatewayPayload) {
  eventHandlers.applicationCommandUpdate?.(
    snakeKeysToCamelCase<ApplicationCommandCreateUpdateDelete>(
      data.d as DiscordApplicationCommandCreateUpdateDelete,
    ),
  );
}
