import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordInviteCreate } from "../../deps.ts";

export function handleInviteCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.inviteCreate(bot, bot.transformers.invite(bot, data.d as DiscordInviteCreate));
}
