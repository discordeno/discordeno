import { DiscordGetGatewayBot } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformGatewayBot(payload: DiscordGetGatewayBot) {
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

export interface GetGatewayBot extends Optionalize<ReturnType<typeof transformGatewayBot>> {}
