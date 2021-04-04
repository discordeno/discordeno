import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleApplicationCommandDelete(data: DiscordGatewayPayload) {
  const {
    application_id: applicationId,
    guild_id: guildId,
    ...rest
  } = data.d as DiscordApplicationCommandCreateUpdateDelete;

  eventHandlers.applicationCommandDelete?.({
    ...rest,
    guildId,
    applicationId,
  });
}
