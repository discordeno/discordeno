import type { Camelize, DiscordGetGatewayBot } from '@discordeno/types'

export function s1nakelize1GatewayBot (payload: Camelize<DiscordGetGatewayBot>): DiscordGetGatewayBot {
  return {
    url: payload.url,
    shards: payload.shards,

    session_start_limit: {
      total: payload.sessionStartLimit.total,
      remaining: payload.sessionStartLimit.remaining,

      reset_after: payload.sessionStartLimit.resetAfter,
      max_concurrency: payload.sessionStartLimit.maxConcurrency
    }
  }
}
