import { snakeKeysToCamelCase } from "../../../mod.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { GetGatewayBot } from "../types/gateway.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot() {
  return snakeKeysToCamelCase(
    await RequestManager.get(
      endpoints.GATEWAY_BOT,
    ),
  ) as GetGatewayBot;
}
