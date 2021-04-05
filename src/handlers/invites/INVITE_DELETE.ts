import { eventHandlers } from "../../bot.ts";
import { DiscordInviteDelete } from "../../types/invites/invite_delete.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export function handleInviteDelete(payload: DiscordGatewayPayload) {
  const {
    channel_id: channelId,
    guild_id: guildId,
    ...rest
  } = payload.d as DiscordInviteDelete;

  eventHandlers.inviteDelete?.({
    ...rest,
    channelId,
    guildId,
  });
}
