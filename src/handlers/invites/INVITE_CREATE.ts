import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { InviteCreate } from "../../types/invites/invite_create.ts";

export function handleInviteCreate(data: DiscordGatewayPayload) {
  eventHandlers.inviteCreate?.(data.d as InviteCreate);
}
