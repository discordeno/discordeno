import type { GetGatewayBot } from "../../types/gateway/getGatewayBot.ts";
import type { Bot } from "../../bot.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot(bot: Bot): Promise<GetGatewayBot> {
  const result = await bot.rest.runMethod<GetGatewayBot>(bot.rest, "get", bot.constants.endpoints.GATEWAY_BOT);

  return bot.transformers.gatewayBot(result);
}
