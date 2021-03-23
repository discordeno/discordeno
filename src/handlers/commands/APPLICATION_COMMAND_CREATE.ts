import { eventHandlers } from "../../bot.ts";
import { ApplicationCommandEvent, DiscordPayload } from "../../types/mod.ts";

export function handleApplicationCommandCreate(
  data: DiscordPayload,
) {
  const {
    guild_id: guildId,
    application_id: applicationId,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandCreate?.({
    ...rest,
    guildId,
    applicationId,
  });
}
