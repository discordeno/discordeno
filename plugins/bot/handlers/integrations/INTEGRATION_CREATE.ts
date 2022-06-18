import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from "../../deps.ts";

export function handleIntegrationCreate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationCreate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate),
  );
}
