import type { Bot } from "../../bot.ts";
import { GetGatewayBot } from "../../transformers/gatewayBot.ts";
import { DiscordGetGatewayBot } from "../../types/discord.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot(bot: Bot): Promise<GetGatewayBot> {
  const result = await bot.rest.runMethod<DiscordGetGatewayBot>(bot.rest, "GET", bot.constants.routes.GATEWAY_BOT());

  return bot.transformers.gatewayBot(result);
}
