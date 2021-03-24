import { eventHandlers } from "../../bot.ts";

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
