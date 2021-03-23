import { eventHandlers } from "../../bot.ts";

export function handleApplicationCommandCreate(
  data: DiscordPayload,
) {
  const {
    guild_id: guildID,
    application_id: applicationID,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandCreate?.({
    ...rest,
    guildID,
    applicationID,
  });
}
