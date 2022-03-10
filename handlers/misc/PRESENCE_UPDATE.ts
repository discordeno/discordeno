import { Bot } from "../../bot.ts";
import { DiscordPresenceUpdate } from "../../types/discord.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.presenceUpdate(bot, bot.transformers.presence(bot, data.d as DiscordPresenceUpdate));
}
