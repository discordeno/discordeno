import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { InviteCreate } from "../../types/invites/inviteCreate.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d as SnakeCasedPropertiesDeep<InviteCreate>));
}
