import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { InviteDelete } from "../../types/invites/invite_delete.ts";

export function handleInviteDelete(data: DiscordGatewayPayload) {
  eventHandlers.inviteDelete?.(
    data.d as InviteDelete,
  );
}
