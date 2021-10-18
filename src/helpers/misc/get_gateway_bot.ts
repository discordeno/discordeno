import type { GetGatewayBot } from "../../types/gateway/get_gateway_bot.ts";
import {Bot} from "../../bot.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot(bot: Bot) {
  return await bot.rest.runMethod<SnakeCasedPropertiesDeep<GetGatewayBot>>(bot.rest,"get", bot.constants.endpoints.GATEWAY_BOT);
}
