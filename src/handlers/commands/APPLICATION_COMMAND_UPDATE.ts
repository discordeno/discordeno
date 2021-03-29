import { eventHandlers } from "../../bot.ts";

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
