import type { GetGatewayBot } from "../../types/gateway/get_gateway_bot.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Get the bots Gateway metadata that can help during the operation of large or sharded bots. */
export async function getGatewayBot(bot: Bot): Promise<GetGatewayBot> {
  const result = await bot.rest.runMethod<GetGatewayBot>(bot.rest, "get", bot.constants.endpoints.GATEWAY_BOT);

  return {
    url: result.url,
    shards: result.shards,
    sessionStartLimit: {
      total: result.session_start_limit.total,
      remaining: result.session_start_limit.remaining,
      resetAfter: result.session_start_limit.reset_after,
      maxConcurrency: result.session_start_limit.max_concurrency,
    },
  };
}
