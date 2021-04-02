import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot() {
  const result = await rest.runMethod("get", endpoints.GATEWAY_BOT);

  return result as DiscordBotGatewayData;
}
