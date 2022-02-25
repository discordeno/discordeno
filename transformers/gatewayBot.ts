import { GetGatewayBot } from "../types/gateway/getGatewayBot.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformGatewayBot(payload: SnakeCasedPropertiesDeep<GetGatewayBot>): GetGatewayBot {
  return {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency,
    },
  };
}
