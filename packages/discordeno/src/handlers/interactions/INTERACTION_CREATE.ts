import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordInteraction } from "../../types/discord.ts";

export async function handleInteractionCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.cache.unrepliedInteractions.add(bot.transformers.snowflake((data.d as DiscordInteraction).id));
  bot.events.interactionCreate(bot, bot.transformers.interaction(bot, data.d as DiscordInteraction));
}
