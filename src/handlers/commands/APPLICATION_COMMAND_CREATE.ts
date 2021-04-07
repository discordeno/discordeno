import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordApplicationCommandCreateUpdateDelete } from "../../types/interactions/application_command_create_update_delete.ts";

export function handleApplicationCommandCreate(
  data: DiscordGatewayPayload,
) {
  const {
    guild_id: guildId,
    application_id: applicationId,
    ...rest
  } = data.d as DiscordApplicationCommandCreateUpdateDelete;

  eventHandlers.applicationCommandCreate?.({
    ...rest,
    guildId,
    applicationId,
  });
}
