import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  ApplicationCommandCreateUpdateDelete,
  DiscordApplicationCommandCreateUpdateDelete,
} from "../../types/interactions/application_command_create_update_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleApplicationCommandUpdate(data: DiscordGatewayPayload) {
  const {
    application_id: applicationId,
    guild_id: guildId,
    ...rest
  } = data.d as DiscordApplicationCommandCreateUpdateDelete;

  eventHandlers.applicationCommandUpdate?.(
    snakeKeysToCamelCase<ApplicationCommandCreateUpdateDelete>(
      data.d as DiscordApplicationCommandCreateUpdateDelete,
    ),
  );
}
