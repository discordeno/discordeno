import { eventHandlers } from "../../bot.ts";
import { ApplicationCommandEvent, DiscordPayload } from "../../types/mod.ts";

export function handleApplicationCommandUpdate(data: DiscordPayload) {
  const {
    application_id: applicationId,
    guild_id: guildId,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandUpdate?.({
    ...rest,
    guildId,
    applicationId,
  });
}
