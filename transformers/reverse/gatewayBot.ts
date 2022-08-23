import { DiscordGetGatewayBot } from "../../types/discord.ts";
import { GetGatewayBot } from "../gatewayBot.ts";

export function transformGatewayBotToDiscordGatewayBot(payload: GetGatewayBot): DiscordGetGatewayBot {
  return {
    url: payload.url,
    shards: payload.shards,
    session_start_limit: {
      total: payload.sessionStartLimit.total,
      remaining: payload.sessionStartLimit.remaining,
      reset_after: payload.sessionStartLimit.resetAfter,
      max_concurrency: payload.sessionStartLimit.maxConcurrency,
    },
  };
}
