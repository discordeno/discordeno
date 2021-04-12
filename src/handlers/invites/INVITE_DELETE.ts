import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordInviteDelete,
  InviteDelete,
} from "../../types/invites/invite_delete.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleInviteDelete(data: DiscordGatewayPayload) {
  eventHandlers.inviteDelete?.(
    snakeKeysToCamelCase<InviteDelete>(data.d as DiscordInviteDelete),
  );
}
