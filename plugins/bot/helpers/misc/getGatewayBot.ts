import { Bot } from "../../bot.ts";
import { DiscordGetGatewayBot } from "../../deps.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot(bot: Bot) {
  const result = await bot.rest.runMethod<DiscordGetGatewayBot>(bot.rest, "GET", bot.constants.routes.GATEWAY_BOT());

  return bot.transformers.gatewayBot(result);
}
