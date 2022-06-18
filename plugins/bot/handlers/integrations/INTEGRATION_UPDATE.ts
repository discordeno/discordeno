import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordIntegrationCreateUpdate } from "../../deps.ts";

export function handleIntegrationUpdate(bot: Bot, data: DiscordGatewayPayload) {
  bot.events.integrationUpdate(
    bot,
    bot.transformers.integration(bot, data.d as DiscordIntegrationCreateUpdate),
  );
}
