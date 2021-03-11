import { eventHandlers } from "../../bot.ts";

export function handleIntegrationDelete(data: DiscordPayload) {
  const {
    guild_id: guildID,
    application_id: applicationID,
    ...rest
  } = data.d as IntegrationDeleteEvent;

  eventHandlers.integrationDelete?.({
    ...rest,
    applicationID,
    guildID,
  });
}
