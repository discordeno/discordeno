import { Bot } from "../../bot.ts";
import type { PresenceUpdate } from "../../types/activity/presence_update.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<PresenceUpdate>;
  bot.events.presenceUpdate(bot, bot.transformers.presence(bot, payload));
}
