import type { Camelize, DiscordGetGatewayBot } from '@discordeno/types'

export function c1amelize1GatewayBot (
  payload: DiscordGetGatewayBot
): Camelize<DiscordGetGatewayBot> {
  return {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency
    }
  }
}
