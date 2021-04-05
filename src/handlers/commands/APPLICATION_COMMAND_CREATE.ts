import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

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
