import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import {
  DiscordInviteCreate,
  InviteCreate,
} from "../../types/invites/invite_create.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

export function handleInviteCreate(data: DiscordGatewayPayload) {
  eventHandlers.inviteCreate?.(
    snakeKeysToCamelCase<InviteCreate>(data.d as DiscordInviteCreate),
  );
}
