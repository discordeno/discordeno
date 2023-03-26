import type { DiscordGetGatewayBot } from '@discordeno/types'
import type { Optionalize } from '../optionalize.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformGatewayBot(payload: DiscordGetGatewayBot) {
  const gatewayBot = {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency,
    },
  }

  return gatewayBot as Optionalize<typeof gatewayBot>
}

export interface GetGatewayBot extends ReturnType<typeof transformGatewayBot> {}
