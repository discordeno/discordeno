import { eventHandlers } from "../../bot.ts";
import {
  DiscordGatewayPayload,
  DiscordInviteDelete,
} from "../../types/gateway.ts";

export function handleInviteDelete(payload: DiscordGatewayPayload) {
  const {
    channel_id: channelID,
    guild_id: guildID,
    ...rest
  } = payload.d as DiscordInviteDelete;

  eventHandlers.inviteDelete?.({
    ...rest,
    channelID,
    guildID,
  });
}
