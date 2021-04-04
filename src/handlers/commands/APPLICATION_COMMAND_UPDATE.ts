import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleApplicationCommandUpdate(data: DiscordGatewayPayload) {
  const {
    application_id: applicationId,
    guild_id: guildId,
    ...rest
  } = data.d as DiscordApplicationCommandCreateUpdateDelete;

  eventHandlers.applicationCommandUpdate?.({
    ...rest,
    guildId,
    applicationId,
  });
}
