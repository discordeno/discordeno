import { DiscordGetGatewayBot, GetGatewayBot, Optionalize } from '@discordeno/types'

export function transformGatewayBot (payload: DiscordGetGatewayBot): GetGatewayBot {
  const gatewayBot = {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency
    }
  }

  return gatewayBot as Optionalize<typeof gatewayBot>
}
