import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handleThreadMemberUpdate(bot: Bot, data: DiscordGatewayPayload) {
  // This event is documented for completeness, but unlikely to be used by most bots
  return;
}
