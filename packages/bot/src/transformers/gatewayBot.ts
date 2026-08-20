import type { DiscordGetGatewayBot, DiscordSessionStartLimit } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import type { GetGatewayBot, SessionStartLimit } from './types.js';

export function transformGatewayBot(bot: Bot, payload: Partial<DiscordGetGatewayBot>, extra?: { partial?: boolean }) {
  const gatewayBot = {} as SetupDesiredProps<GetGatewayBot, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.url) gatewayBot.url = payload.url;
  if (payload.shards !== undefined) gatewayBot.shards = payload.shards;
  if (payload.session_start_limit) gatewayBot.sessionStartLimit = bot.transformers.sessionStartLimit(bot, payload.session_start_limit);

  return callCustomizer('gatewayBot', bot, payload, gatewayBot, {
    partial: extra?.partial ?? false,
  });
}

export function transformSessionStartLimit(bot: Bot, payload: Partial<DiscordSessionStartLimit>, extra?: { partial?: boolean }) {
  const sessionStartLimit = {} as SetupDesiredProps<SessionStartLimit, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (payload.total !== undefined) sessionStartLimit.total = payload.total;
  if (payload.remaining !== undefined) sessionStartLimit.remaining = payload.remaining;
  if (payload.reset_after !== undefined) sessionStartLimit.resetAfter = payload.reset_after;
  if (payload.max_concurrency !== undefined) sessionStartLimit.maxConcurrency = payload.max_concurrency;

  return callCustomizer('sessionStartLimit', bot, payload, sessionStartLimit, {
    partial: extra?.partial ?? false,
  });
}
