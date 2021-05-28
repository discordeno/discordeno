import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { InviteDelete } from "../../types/invites/invite_delete.ts";

export function handleInviteDelete(data: DiscordGatewayPayload) {
  eventHandlers.inviteDelete?.(data.d as InviteDelete);
}
