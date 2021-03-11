import { eventHandlers } from "../../bot.ts";
import { ApplicationCommandEvent, DiscordPayload } from "../../types/mod.ts";

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
