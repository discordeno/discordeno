import type {
  DiscordGetGatewayBot,
  GetGatewayBot,
  Optionalize
} from '@discordeno/types'

export function transformGatewayBot (
  payload: DiscordGetGatewayBot
): GetGatewayBot {
  const gatewayClient = {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency
    }
  }

  return gatewayClient as Optionalize<typeof gatewayClient>
}
