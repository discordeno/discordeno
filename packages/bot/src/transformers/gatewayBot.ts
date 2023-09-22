import type { DiscordGetGatewayBot } from '@discordeno/types'

export function transformGatewayBot(payload: DiscordGetGatewayBot): GetGatewayBot {
  const gatewayBot = {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency,
    },
  } as GetGatewayBot

  return gatewayBot
}

export interface GetGatewayBot {
  url: string
  shards: number
  sessionStartLimit: {
    total: number
    remaining: number
    resetAfter: number
    maxConcurrency: number
  }
}
