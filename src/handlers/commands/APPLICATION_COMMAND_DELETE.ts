import { eventHandlers } from "../../bot.ts";
import {
  DiscordApplicationCommandCreateUpdateDelete,
  DiscordGatewayPayload,
} from "../../types/gateway.ts";

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
