import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordPresenceUpdate } from "../../types/discord.ts";

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.presenceUpdate(bot, bot.transformers.presence(bot, data.d as DiscordPresenceUpdate));
}
