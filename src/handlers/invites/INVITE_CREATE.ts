import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { InviteCreate } from "../../types/invites/invite_create.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d as SnakeCasedPropertiesDeep<InviteCreate>));
}
