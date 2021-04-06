import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordInviteDelete,
  InviteDelete,
} from "../../types/invites/invite_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleInviteDelete(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordInviteDelete;

  eventHandlers.inviteDelete?.(snakeKeysToCamelCase(payload) as InviteDelete);
}
