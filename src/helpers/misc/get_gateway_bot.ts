import { rest } from "../../rest/rest.ts";
import { DiscordGetGatewayBot, GetGatewayBot } from "../../types/gateway/get_gateway_bot.ts";
import { endpoints } from "../../util/constants.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot() {
  const result = await rest.runMethod("get", endpoints.GATEWAY_BOT);

  return camelKeysToSnakeCase(result as DiscordGetGatewayBot) as GetGatewayBot;
}
