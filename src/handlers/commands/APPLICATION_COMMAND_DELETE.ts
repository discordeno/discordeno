import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type {
  ApplicationCommandCreateUpdateDelete,
} from "../../types/interactions/application_command_create_update_delete.ts";

export function handleApplicationCommandDelete(data: DiscordGatewayPayload) {
  eventHandlers.applicationCommandDelete?.(
    data.d as ApplicationCommandCreateUpdateDelete,
  );
}
