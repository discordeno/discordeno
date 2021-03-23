import { eventHandlers } from "../../bot.ts";

export function handleApplicationCommandUpdate(data: DiscordPayload) {
  const {
    application_id: applicationID,
    guild_id: guildID,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandUpdate?.({
    ...rest,
    guildID,
    applicationID,
  });
}
