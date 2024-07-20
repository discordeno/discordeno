import type { DiscordGetGatewayBot } from '@discordeno/types'
import type { Bot, GetGatewayBot } from '../index.js'

export function transformGatewayBot(bot: Bot, payload: DiscordGetGatewayBot): GetGatewayBot {
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

  return bot.transformers.customizers.gatewayBot(bot, payload, gatewayBot)
}
