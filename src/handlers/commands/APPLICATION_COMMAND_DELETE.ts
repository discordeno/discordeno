import { eventHandlers } from "../../bot.ts";

export function handleApplicationCommandDelete(data: DiscordPayload) {
  const {
    application_id: applicationId,
    guild_id: guildId,
    ...rest
  } = data.d as ApplicationCommandEvent;

  eventHandlers.applicationCommandDelete?.({
    ...rest,
    guildId,
    applicationId,
  });
}
