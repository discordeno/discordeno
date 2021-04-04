import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleIntegrationDelete(data: DiscordGatewayPayload) {
  const {
    guild_id: guildId,
    application_id: applicationId,
    ...rest
  } = data.d as IntegrationDeleteEvent;

  eventHandlers.integrationDelete?.({
    ...rest,
    applicationId,
    guildId,
  });
}
