import type { DiscordGetGatewayBot } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { GetGatewayBot } from './types.js';

export function transformGatewayBot(bot: Bot, payload: DiscordGetGatewayBot) {
  const gatewayBot = {
    url: payload.url,
    shards: payload.shards,
    sessionStartLimit: {
      total: payload.session_start_limit.total,
      remaining: payload.session_start_limit.remaining,
      resetAfter: payload.session_start_limit.reset_after,
      maxConcurrency: payload.session_start_limit.max_concurrency,
    },
  } as GetGatewayBot;

  return bot.transformers.customizers.gatewayBot(bot, payload, gatewayBot);
}
